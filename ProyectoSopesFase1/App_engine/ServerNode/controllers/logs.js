const mongoose=require ('mongoose');
const Data=require("../models/logs");

const findAllLogs =(req, res) =>{
    Data.find((err, logs)=>{
        err && res.status(500).send(err.message);

        res.status(200).json(logs);

    })
}

module.exports ={findAllLogs}