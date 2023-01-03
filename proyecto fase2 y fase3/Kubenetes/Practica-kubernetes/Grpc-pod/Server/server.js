
var PROTO_PATH = __dirname + '/todo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;


///cantidad de objetos ingresados
const todos = []

////////////////////////Rabbit


const amqp = require('amqplib')
const queue = process.env.QUEUE || 'hello'

const messagesAmount = 1     //cuantas veces mando los mensajes jajaja
const wait = 400


require('dotenv').config()

function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
  })
}

async function sleepLoop(number, cb) {
  while (number--) {
      await sleep(wait)

      cb()
  }
}

async function exitAfterSend() {
  await sleep(messagesAmount * wait * 1.2)

  process.exit(0)
}


//publisher().catch((error) => {
 // console.error(error)
 // process.exit(1)
//})

//exitAfterSend()
//////////////////////////////////


















/**
 * Implements the LlenarJson RPC method.
 */
async function LlenarJson(call, callback) {
  //callback(null, {message: 'Hello ' + call.request.name});
  const LlenarRequest= {
              "id_game": todos.length +1,
              "players": call.request.players
  }
  todos.push(call.request)

  console.log(call.request);

  var id_juego = parseInt(call.request.game_id);
  var ganador ;
  var game_name = "";
  switch (id_juego) {
    case 1:
      ganador = randomNumber(parseInt(call.request.players))
      game_name = "Game_1";
      break;
    case 2:
      ganador = randomNumber(parseInt(call.request.players))
      game_name = "Game_2";
      break;
    case 3:
      ganador = randomNumber(parseInt(call.request.players))
      game_name = "Game_3";
      break;
    case 4:
      ganador = randomNumber(parseInt(call.request.players))
      game_name = "Game_4";
      break;
    case 5:
      ganador = randomNumber(parseInt(call.request.players))
      game_name = "Game_5";
      break;
    default:
}

  
var jsonTexto = '{"request_number": "'+  todos.length +'", "game_id": "'+ id_juego + '", "players": "'+ call.request.players + '", "game_name" :"'+ game_name + '", "winner" :"'+ ganador + '", "queue" : "Rabbit" }' 
 
var coche = JSON.parse(jsonTexto);
console.log(coche);


/////////  ACA VA LA PARTE DE INGRESAR A LA COLA RABBIT   

 
//const connection = await amqp.connect('amqp://'+process.env.AMQP_HOST)  
 const connection = await amqp.connect("amqp://guest:guest@" + process.env.HOST  + ":5672")  
  const channel = await connection.createChannel()

  await channel.assertQueue(queue)

  sleepLoop(messagesAmount, async () => {
      const message = {
          id: Math.random().toString(32).slice(2, 6),
          text: 'Hello world!'
      }

      const sent = await channel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify(coche)),
          {
              // persistent: true
          }
      )

      sent
          ? console.log(`Sent message to "${queue}" queue`, coche)
          : console.log(`Fails sending message to "${queue}" queue`, coche)
  })


 // exitAfterSend()
/////////////////////////////



  callback(null,LlenarRequest);
}


function randomNumber(number) {
  var result = Math.floor(Math.random()*number);
  return result;
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {

  console.log("host_normal es:"+process.env.HOST_NORMAL)

  console.log("host es el siguiente:"+process.env.HOST)
  var server = new grpc.Server();
  server.addService(hello_proto.OperacionAritmetica.service, {
      "LlenarJson": LlenarJson
});
  server.bindAsync(process.env.HOST_NORMAL+":50051", grpc.ServerCredentials.createInsecure(), () => { 
    server.start();
    console.log(`Server esta corriendo en `+process.env.HOST_NORMAL+":50051"); // :50051
  });
}

main();