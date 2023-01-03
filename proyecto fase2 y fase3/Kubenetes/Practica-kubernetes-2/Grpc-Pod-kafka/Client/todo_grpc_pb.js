// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var todo_pb = require('./todo_pb.js');

function serialize_helloworld_LlenarReply(arg) {
  if (!(arg instanceof todo_pb.LlenarReply)) {
    throw new Error('Expected argument of type helloworld.LlenarReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_LlenarReply(buffer_arg) {
  return todo_pb.LlenarReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_helloworld_LlenarRequest(arg) {
  if (!(arg instanceof todo_pb.LlenarRequest)) {
    throw new Error('Expected argument of type helloworld.LlenarRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_helloworld_LlenarRequest(buffer_arg) {
  return todo_pb.LlenarRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var OperacionAritmeticaService = exports.OperacionAritmeticaService = {
  llenarJson: {
    path: '/helloworld.OperacionAritmetica/LlenarJson',
    requestStream: false,
    responseStream: false,
    requestType: todo_pb.LlenarRequest,
    responseType: todo_pb.LlenarReply,
    requestSerialize: serialize_helloworld_LlenarRequest,
    requestDeserialize: deserialize_helloworld_LlenarRequest,
    responseSerialize: serialize_helloworld_LlenarReply,
    responseDeserialize: deserialize_helloworld_LlenarReply,
  },
};

exports.OperacionAritmeticaClient = grpc.makeGenericClientConstructor(OperacionAritmeticaService);
