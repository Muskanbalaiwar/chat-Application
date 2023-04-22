const Sequelize =require('sequelize');

const sequelize=new Sequelize('muskandb','root','Muskan@123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;