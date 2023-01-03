const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{ 
    cors: {
      origin: '*'
    }
}) 



//no tocar nada de io.on
io.on('connection',(socket)=>{
    console.log('cliente conectado: ',socket.id)
    //socket.join('room')
    socket.on('disconnect',(reason)=>{
      console.log("Un cliente se desconecto")
    });

    socket.on('graficaReporte1', data => console.log(data))

  });
  
  setInterval(()=>{
    redis.zrevrange("victorias", 0, 9, "WITHSCORES").then((elements) => {
        io.emit('RedisMejoresJugadores', redisToJsonJugadorVictorias(elements) )

    });
  },1000);

  setInterval(()=>{
      
    redis.lrange('ultimosJuegos', 0, 9, function(err, reply) {
        io.emit('RedisUltimosJuegos', redisToJsonUltimosJuegos(reply) )
    });
   
  },1010);

  setInterval(()=>{
    redis.zrevrange("victorias", 0, -1).then((elements) => {
        
       
        io.emit('ListaJugadores', redisToJsonJugadores(elements) )
    });
  },1020);

  setInterval(()=>{
    redis.zrevrange("victorias", 0, -1, "WITHSCORES").then((elements) => {
        
        io.emit('RedisGrafica', redisToJsonListadoJugadores(elements), redisToJsonListadoVictoriasJugadores(elements) )
    });
  },1000);
 

  
  setInterval(()=>{

    var sql= "select game_name from logs order by id DESC limit 10;";
    con.query(sql, (error, result)=>{
      if(error) throw error;

      if (result.length>0){
    
        io.emit('TidisUltimosJuegos', result );
      } else{
        io.emit('TidisUltimosJuegos', [{"game_name":"SIN RESULTADOS"}])
      }
  })
  },5010);


  



  setInterval(()=>{
    var sql= "select winner, COUNT(winner) as victorias from logs group by winner order by victorias DESC  limit 10;";
    con.query(sql, (error, result)=>{
        if(error) throw error;
  
        if (result.length>0){
            io.emit('TidisMejoresJugadores', result );
        } else{
            io.emit('TidisMejoresJugadores', [{"winner": "Sin Ganadores", "victorias": "Sin Victorias"}])
        }
    })

  },5035);


  setInterval(()=>{
    var sql= "select winner, COUNT(winner) as victorias from logs group by winner ;";
    con.query(sql, (error, result)=>{
        if(error) throw error;
  
        if (result.length>0){
            var winner=[]
            var victorias=[]

            for (var i = 0; i < result.length; i++) {
                var datosWinner="player"+result[i].winner
                var datosVictorias= result[i].victorias
                winner.push(datosWinner)
                victorias.push(datosVictorias)
                };
            
            io.emit('TidisGrafica', winner, victorias);
          
            
        } else{
           // io.emit('TidisGrafica', [{"winner": "Sin Ganadores", "victorias": "Sin Victorias"}])
        }
    })
  },5000);
 



  


////////////////////////////////////////CONEXION REDIS//////////////////////////////////
const Redis = require("ioredis");
const redis = new Redis("redis://:password@34.125.12.38:6379/0");

//REPORTE1  Últimos 10 juegos.
        //RedisUltimosJuegos
//REPORTE2 Los 10 mejores jugadores.
        //RedisMejoresJugadores

//REPORTE3 Estadísticas del jugador en tiempo real.
        //RedisListaJugadores
        //RedisVictoriasDeJugador/:jugador
 
///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////CONEXION tidis//////////////////////////////////
var mysql = require('mysql');
const { ConnectionTimeoutError } = require('redis');

var con = mysql.createConnection({
  host: "34.125.54.35",
  user: "gonzcaal",
  password: "password",
  database: "fase2DB",
  port: 4000,
});




//REPORTE1  Últimos 10 juegos.
        //TidisUltimosJuegos
//REPORTE2 Los 10 mejores jugadores.
        //TidisMejoresJugadores

//REPORTE3 Estadísticas del jugador en tiempo real.
        //TidisListaJugadores
        //TidisVictoriasDeJugador/:jugador
 
///////////////////////////////////////////////////////////////////////////////////////
 
// Without middleware
app.get('/RedisMejoresJugadores', function(req, res){
    redis.zrevrange("victorias", 0, 9, "WITHSCORES").then((elements) => {
        console.log(redisToJsonJugadorVictorias(elements))
        res.json(redisToJsonJugadorVictorias(elements))
    });
});

app.get('/RedisUltimosJuegos', function(req, res){
    redis.lrange('ultimosJuegos', 0, 9, function(err, reply) {
        res.json(redisToJsonUltimosJuegos(reply));
    });
    
});

app.get('/RedisVictoriasDeJugador/:jugador', function(req, res) {

    var jugador = req.params.jugador; //or use req.param('id')
   
    redis.zscore("victorias", jugador ).then((elements) => {
        res.json(redisToJsonVictoriasJugador(elements));
      });
   
   });

app.get('/RedisListaJugadores', function(req, res){
    redis.zrange("victorias", 0, -1 ).then((elements) => {  
        res.json(redisToJsonJugadores(elements));
      });
    
});




app.get('/TidisUltimosJuegos', function(req, res){
    var sql= "select game_name from logs order by id DESC limit 10;";
    con.query(sql, (error, result)=>{
        if(error) throw error;

        if (result.length>0){
            res.json(result);
        } else{
            res.send([{"game_name":"SIN RESULTADOS"}])
        }
    })
});

app.get('/TidisMejoresJugadores', function(req, res){

    var sql= "select winner, COUNT(winner) as victorias from logs group by winner order by victorias DESC  limit 10;";
    con.query(sql, (error, result)=>{
        if(error) throw error;

        if (result.length>0){
            res.json(result);
        } else{
            res.send([{"game_name":"SIN RESULTADOS"}])
        }
    })
    
});

app.get('/TidisListaJugadores', function(req, res){
    var sql= "select winner as jugador from logs group by winner order by winner";
    con.query(sql, (error, result)=>{
        if(error) throw error;

        if (result.length>0){
            res.json(result);
        } else{
            res.send([{"game_name":"SIN RESULTADOS"}])
        }
    })
    
});


 
app.get('/TidisVictoriasDeJugador/:jugador', function(req, res) {

    var jugador = req.params.jugador; //or use req.param('id')
    var sql= "select winner, COUNT(winner) as victorias from logs where winner="+ jugador+" group by winner ";
    con.query(sql, (error, result)=>{
        if(error) throw error;

        if (result.length>0){
            res.json(result);
        } else{
            res.send([{"game_name":"SIN RESULTADOS"}])
        }
    })
   
   
   });
 


function redisToJsonJugadorVictorias(elements){
    var salida=[]
    for (var i = 0; i < elements.length; i=i+2) {
        var datos={"jugador": elements[i],"victorias":elements[i+1]}
        salida.push(datos)
        };
    //console.log(salida)
    //console.log(elements)
    return salida
} 

function redisToJsonUltimosJuegos(elements){
    var salida=[]
    for (var i = 0; i < elements.length; i++) {
        var datos={"juego": elements[i]}
        salida.push(datos)
        };
    return salida
} 

function redisToJsonJugadores(elements){
    var salida=[]
    for (var i = 0; i < elements.length; i++) {
        var datos={"nombreJugador": elements[i]}
        salida.push(datos)
        };
    return salida
} 

function redisToJsonVictoriasJugador(elements){
    var salida=[]
    for (var i = 0; i < elements.length; i++) {
        var datos={"victorias": elements[i]}
        salida.push(datos)
        };
    return salida
} 

function redisToJsonListadoJugadores(elements){
    var jugadores=[]
   
    for (var i = 0; i < elements.length; i=i+2) {
        var datosJugadores="player"+elements[i]
        jugadores.push(datosJugadores)
        };
    //console.log(salida)
    //console.log(elements)
    return jugadores
} 


function redisToJsonListadoVictoriasJugadores(elements){
    var victorias =[]
    for (var i = 0; i < elements.length; i=i+2) {
        var datosVictorias=elements[i+1]
        victorias.push(datosVictorias)
        };
    //console.log(salida)
    //console.log(elements)
    return victorias
} 







server.listen(PORT, err=> {
    if(err) console.log(err)
    console.log('Server running on Port ', PORT)
  });