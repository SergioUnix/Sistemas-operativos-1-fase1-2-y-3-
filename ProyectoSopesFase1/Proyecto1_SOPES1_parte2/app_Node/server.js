var express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Logs=require('./api/logs');
const { addAbortSignal } = require('stream');
const app = express();

//PARA SOCKETS
var server =require('http').Server(app);
var io =require('socket.io')(server);



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/hello', function (req, res){
   res.status(200).send("hello world"); 
});
app.use("/api/logs", Logs);


PORT=4000;
mongoose.Promise=global.Promise;
mongoose.connect(
    
    "mongodb://root:root@127.0.0.1:27017/proyecto1DB?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    {
        useNewUrlParser: true
    },
    (err, res) => {
        console.log(err);
        err && console.log("Error al conectar a la Base de Datos");
    
        app.listen(PORT, ()=>{
            console.log("Servidor corriendo en el puerto: ", PORT)
        })
    }
);