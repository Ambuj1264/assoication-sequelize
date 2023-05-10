const express=require("express");
const router=express.Router();
const userController=require("../../controller/user/index")
const joinController=require("../../controller/join/index")
router.post("/registration", userController.register);
router.post("/login",userController.login );
router.post("/reset",userController.reset);
router.post("/resetAndVerify", userController.resetandverify);
router.post("/posts",joinController.post);
router.post("/joinOne",joinController.one_to_one_join);
router.post("/joinMany",joinController.one_to_many_join);
router.post("/manytomany",joinController.many_to_many_join)
router.post("/tags",joinController.tags)
router.post("/posttag",joinController.post_tags)
router.post("/posttagdisplay",joinController.post_tagss)


module.exports=router;