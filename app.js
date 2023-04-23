const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');

const sign=require('./routes/sign')
const chat=require('./routes/chat')
const sign_Table=require('./models/sign');
const chat_Table=require('./models/chat')
const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sign)
app.use(chat)
sign_Table.hasMany(chat_Table)
chat_Table.belongsTo(sign_Table)
sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log('err');
})
app.listen(3001);
