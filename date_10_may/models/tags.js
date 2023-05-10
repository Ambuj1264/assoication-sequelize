const sequelize=require("../connections/db")
const Post=require("./post");

const {Sequelize, DataTypes}=require("sequelize")

const tags= sequelize.define("tags",{
    name:{
        type:DataTypes.STRING
    }
})

// tags.sync({
//     force:true
// });
Post.belongsToMany(tags,{through:"post_tags"});//belongs to is use for many to many association 
tags.belongsToMany(Post,{through:"post_tags"});//through is use for 3rd party model for who have postId, and tagId

module.exports=tags;