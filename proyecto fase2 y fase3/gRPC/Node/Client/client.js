
var PROTO_PATH = __dirname + '/todo.proto';

var parseArgs = require('minimist');
var messages = require('./todo_pb');
var services = require('./todo_grpc_pb');

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

var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const host = 'localhost';
const port = 2000;


router.post('', function(req, res, next) {
  console.log('recibiendo datos ----', req.body)

    var argv = parseArgs(process.argv.slice(2), {
        string: 'target'
      });
      var target;
      if (argv.target) {
        target = argv.target;
      } else {
       // target = 'localhost:50051';
       target = '34.71.136.31:50051';
      
      }
      var client = new hello_proto.OperacionAritmetica(target, grpc.credentials.createInsecure());

   

      var request = new messages.LlenarRequest(req.body);




      var json = {"game_id":  req.body.game_id+"", "players": req.body.players+""}
  
     
      client.LlenarJson(json, function(err, response) {
        console.log('-------------- Greeting -- error :', err);
        console.log('-------------- Greeting:', response);
      });



    console.log(req.body);
    console.log(request.array);

    res.send('Todo Bien');
}); 


router.get('', function(req, res, next) {
res.send('API GO - gRPC Client  Node!');
}); 


app.use('/enviarLoadBalancer', router);
app.use('/test/client', router);

app.listen(2000);
