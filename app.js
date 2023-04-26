const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');

const sign=require('./routes/sign')
const chat=require('./routes/chat')
const sign_Table=require('./models/sign');
const message_Table=require('./models/chat')
const group_Table=require('./models/group')
const userGroup=require('./models/userGroup')
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sign)
app.use(chat)
sign_Table.hasMany(message_Table)
message_Table.belongsTo(sign_Table)
group_Table.hasMany(message_Table);
message_Table.belongsTo(group_Table);

sign_Table.belongsToMany(group_Table, { through: userGroup });
group_Table.belongsToMany(sign_Table, { through: userGroup });
sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log('err');
})
app.listen(3001);
