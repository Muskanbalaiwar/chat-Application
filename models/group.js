const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Data = sequelize.define('group', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
   allowNull: false,
    primaryKey: true
  },
 
    groupName:Sequelize.STRING
 
  
});

module.exports = Data;