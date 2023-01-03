const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const dataSchema = new Schema({
    
        nombreWM: {type: String},
        endpoint:{type: String},
        data: [{
                total:{type: Number},
                memoriaEnUso:{type: Number},
                porcentaje : {type: Number},
                memoriaLibre: {type: Number}
        }],
        date: {type: String}
        
});

module.exports= data = mongoose.model('logs', dataSchema)