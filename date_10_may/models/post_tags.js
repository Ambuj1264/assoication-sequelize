const sequelize=require("../connections/db")
const user=require("./user");

const {Sequelize, DataTypes}=require("sequelize")
const post_tags=sequelize.define("post_tags",{
        postId:DataTypes.INTEGER,
        tagId:DataTypes.INTEGER,
        description:DataTypes.STRING
})

// post_tags.sync({
//     force:true,alter:true
// })
module.exports=post_tags;