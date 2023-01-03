const express = require('express');
const mongoose = require('mongoose');
const Logs=require('./api/logs');
const Data=require("./models/logs");
const { createServer } = require("http");
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
io = new Server(httpServer,{cors: {
    origin: "*"
  }});

const cors = require('cors');

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


/**
 * Configuracion del servidor
 */
 const PORT = 2006;
 const HOST = '0.0.0.0';



  const username = "mongoadmin";
  const password = "So1pass1S_2022";
  const cluster = "34.123.158.31:27017";
  const dbname = "proyectofuncion";
  //originl ---104.198.71.168:27017
 

  
   /**
  * INICIANDO CONEXION CON MONGO
  */

    mongoose.Promise=global.Promise;
    mongoose.connect(
        
        "mongodb://104.198.71.168:27017/proyecto1DB?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
        {
            useNewUrlParser: true
        },
        (err, res) => {
          
            err && console.log("Error al conectar a la Base de Datos");
        }
    );
  
/**
 * RUTAS HTTP
 */

app.get('/',(req, res)=>{
    res.status(200).send({message:"Welcome to this api for SOPES1"})
});

app.use("/api/logs", Logs);


/**
 * SOCKET.IO
 */

const getDataFromMongo = () =>{
    //Consulta aqui
    
}


io.on('connection', (socket)=>{
    console.log("Socket ID:",socket.id);
    socket.join("josuecito");
    console.log('User Joined Room:', "josuecito")

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to("josuecito").emit("receive_message", data.content);
    });

    socket.on("request_data", ()=>{
        console.log("Enviarndo Resultado Query")
        Data.find((err, logs)=>{
            if(!!err){
                console.error(err.message)
                io.in("josuecito").emit("receive_result", []);
                return;
            }
            io.in("josuecito").emit("receive_result", logs);
    
        })
    })

    socket.on('disconnect', ()=> {
        console.log('USER DISCONNECTED');
    })
})

httpServer.listen(PORT, HOST, () => {
    console.log(`Access Point of Server: http://${HOST}:${PORT}`);
});