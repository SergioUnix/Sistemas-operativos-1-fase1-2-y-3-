--Iniciar package-json
npm init
--crear el .proto

---Instalar dependencia
npm install grpc @grpc/proto-loader
-- instalar grpc
npm i @grpc/grpc-js

-- instalar express para client  de nodejs
npm install express --save
-- para el cliente
npm install --save body-parser

---para el cliente y generar los demas archivos .js
npm install -g grpc-tools
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. todo.proto

---para el cliente 
npm i google-protobuf




--limpia los puertos usados por node 
killall -9 node 