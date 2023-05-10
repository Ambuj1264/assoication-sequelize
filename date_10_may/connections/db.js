const Sequelize= require("sequelize");

const sequelize = new Sequelize(
    'e-comm',
    'root',
    'root',
    {
      host: 'localhost',
      dialect: 'mysql',
      // logging: false //when query logger in not need
      // logging:console.log
    }
  )
  sequelize.authenticate().then(()=>{
    console.log("database is conneted .......")
}).catch(()=>{
    console.log("database is not connected");

})


module.exports=sequelize;


