const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('test2','postgres','root',
    {
    host:'localhost',
    port:5432, 
    dialect:'postgres',
    timezone: "+05:30",
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }},


})


module.exports = sequelize;
// export for CommonJS syntax
// export default sequelize;
//  //for ES6 module syntax


















