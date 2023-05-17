const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const multer = require('multer');
const upload = multer();
const cron = require('node-cron')


const sequelize=require('./util/database');


const sign=require('./routes/sign')
const chat=require('./routes/chat')
const sign_Table=require('./models/sign');
const message_Table=require('./models/chat')
const group_Table=require('./models/group')
const userGroup=require('./models/userGroup')
const archived_Table = require('./models/archivedChats')


app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// route class
app.use('/file/post/:id',upload.single('file'),chat)
app.use(sign)
app.use(chat)

// relation with tables
sign_Table.hasMany(message_Table)
message_Table.belongsTo(sign_Table)

group_Table.hasMany(message_Table);
message_Table.belongsTo(group_Table);

sign_Table.belongsToMany(group_Table, { through: userGroup });
group_Table.belongsToMany(sign_Table, { through: userGroup });

sign_Table.hasMany(userGroup);
userGroup.belongsTo(sign_Table);

sign_Table.hasMany(archived_Table)
archived_Table.belongsTo(sign_Table)

group_Table.hasMany(archived_Table);
archived_Table.belongsTo(group_Table);


sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log('err');
})



app.use('/',(req,res)=>{
  res.status(200).json('hello data')
})

//socket intialization
var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log('coonection establish '+socket.id);
  socket.on('send-msg',(msg)=>{
//console.log(msg)
socket.emit('receive msg',msg)
  })
})



cron.schedule('*/1 * * * *' , async()=>{
  const chats=await message_Table.findAll();
   
  console.log("chats at cron"+JSON.stringify(chats));

  for(const chat of chats){
    console.log('ids for the chats in message table : ',chat.id)
    await archived_Table.create({message:chat.message,clientId:chat.clientId,groupId:chat.groupId});

    await message_Table.destroy({where:{id:chat.id}});
   
  }

})




    server.listen(3001);




