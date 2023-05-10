const ProductModel = require("../../models/product");
const {Op}=require("sequelize")
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET_KEY
  });
const productController = {
  create: async (req,res) => {
    try {
      const file = req.files.image;
      console.log(file,"data");
  
      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result);
        }
      );
      // console.log(result);

      const createClothes = await ProductModel.create({
        name: req.body.name,
        brand: req.body.brand,
        fakeprice: req.body.fakeprice,
        realprice: req.body.realprice,
        image: result.url,
        description: req.body.description,
        rating: req.body.rating,
        category: req.body.category,
      });
    if(!createClothes){
        res.status(400).json({ msg: "something went wrong"});
    }

      res.status(200).json(
        {
            success:true,
            message:"product is created",
            result:createClothes
        })
      
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  },

  getAll: async (req,res) => {
    try {
      const fulldata = await ProductModel.findAll();
      if(!fulldata){
        res.status(400).json({ msg: "something went wrong"});
    }
      console.log(fulldata);
      res.status(200).json(fulldata);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }

  },
  filterProduct: async (req,res) => {
    try {
        let search=req.body.search
        const fileterData= await ProductModel.findAll({
            where:{
                [Op.or]:{
                   name:{
                    [Op.like]:`%${search}%`
                   },
                   description:{
                    [Op.like]:`%${search}%`
                   },
                   brand:{
                    [Op.like]:`%${search}%`
                   },
                   
                }
            },
            
        })
       
        if( (fileterData.length<1 )){
             res.status(400).send({
                succuss:false,
                message:"data not matach",
                result:[]
            })
        }
        else{
             res.status(200).send({
                succuss:true,
                message:"data is matched",
                result:fileterData
            })
        }
        

    } catch (error) {
        console.log(error.message)
        return res.status(400).send({
            succuss:false,
            message:"data not matach",
            result:error.message
        })
    }
  }
};

module.exports = productController;
