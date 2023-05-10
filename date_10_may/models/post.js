const sequelize=require("../connections/db")
const user=require("./user");

const {Sequelize, DataTypes}=require("sequelize")
const Post= sequelize.define("posts",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contentType:{
        type:DataTypes.ENUM("story","horrer","mistry"),
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

// Post.sync({
//     force:true
// })
// user.hasOne(Post,{foreignKey:"userId",as:"PostDetails"});// hasOne use for one-to-one assocition
user.hasMany(Post,{foreignKey:"userId",as:"PostDetails"});//hasMany user for one-to-many assocition
Post.belongsTo(user,{foreignKey:"userId",as:"UserDetails"});

module.exports=Post;
