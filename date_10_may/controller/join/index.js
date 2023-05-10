const Post = require("../../models/post");
const post_tags = require("../../models/post_tags");
const tags = require("../../models/tags");
const user = require("../../models/user");
const { create } = require("../product/productController");

const joinController = {
  post: async (req, res) => {
    try {
      let title = req.body.title;
      let contentType = req.body.contentType;
      let userId = req.body.userId;

      const createPosts = await Post.create({
        title,
        contentType,
        userId,
      });
      if (!createPosts) {
        res.status(400).send({
          success: false,
          message: "post is not created ",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "posts is created",
        result: createPosts,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },
  post_tags: async (req, res) => {
    try {
      let postId = req.body.postId;
      let tagId = req.body.tagId;
      description= req.body.description

      const createPosts = await post_tags.create({
        postId,
        tagId,
        description
      });
      if (!createPosts) {
        res.status(400).send({
          success: false,
          message: "post is not created ",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "posts is created",
        result: createPosts,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },
  post_tagss:async(req,res)=>{
    try {
        const find= await post_tags.findOne();
        res.send(find)
    } catch (error) {
        console.log(error.stack);
        res.status(400).send(error.message)
    }
  },
  tags: async (req, res) => {
    try {
      let name = req.body.name;

      const createPosts = await tags.create({
        name: name,
      });
      if (!createPosts) {
        res.status(400).send({
          success: false,
          message: "post is not created ",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "posts is created",
        result: createPosts,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },

  one_to_one_join: async (req, res) => {
    try {
      const onetoonejoin = await user.findAll({
        include: {
          model: Post,
          as: "PostDetails",
        },
      });
      if (!onetoonejoin) {
        res.status(400).send({
          success: false,
          message: "something went wrong",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "one to one ",
        result: onetoonejoin,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },
  one_to_many_join: async (req, res) => {
    try {
      const onetoManyjoin = await user.findAll({
        order: [["id", "ASC"]],
        include: {
          model: Post, // jis model ka data get karna ho
          as: "PostDetails", //alias ke liy Post--> PostDetails
          attributes: ["id", "title", "contentType", ["userId", "userDetails"]],
        },
      });
      if (!onetoManyjoin) {
        res.status(400).send({
          success: false,
          message: "something went wrong",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "one to one ",
        result: onetoManyjoin,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },
  many_to_many_join: async (req, res) => {
    try {
      const onetoManyjoin = await Post.findAll({
        include: {
          model: tags,
        },
      });
      if (!onetoManyjoin) {
        res.status(400).send({
          success: false,
          message: "something went wrong",
          result: [],
        });
      }
      res.status(200).send({
        success: true,
        message: "one to one ",
        result: onetoManyjoin,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "something went wrong",
        result: error.message,
      });
    }
  },
};

module.exports = joinController;
