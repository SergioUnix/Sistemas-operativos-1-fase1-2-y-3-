const DataContoller=require('../controllers/logs');
const express =require('express');

const router=express.Router();


router.get("/all", DataContoller.findAllLogs);
module.exports=router;