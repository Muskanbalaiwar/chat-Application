const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database');

const sign=require('./routes/sign')
const app = express();
app.use(bodyParser.json())
app.use(cors());

app.use(sign)

sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log(err);
})
app.listen(3001);
