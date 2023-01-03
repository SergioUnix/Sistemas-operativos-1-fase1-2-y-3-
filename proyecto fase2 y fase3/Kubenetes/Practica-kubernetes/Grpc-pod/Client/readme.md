----------------------Iniciamos el proyecto

mkdir gRPC-Client-api

cd gRPC-Client-api

go mod init github.com/racarlosdavid/demo-gRPC-kubernetes/gRPC-Client-api

mkdir gRPC-Server

cd gRPC-Server

go mod init github.com/demo/grpc-client


------------------- Instalar dependencias gRPC

go get -u google.golang.org/grpc

go get github.com/golang/protobuf/proto@v1.5.2

go get google.golang.org/protobuf/reflect/protoreflect@v1.27.1

go get google.golang.org/protobuf/runtime/protoimpl@v1.27.1


--------------Instalar dependencias para compilar el .proto

go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1
export PATH="$PATH:$(go env GOPATH)/bin"

protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/demo.proto


---------API - Instalamos gorilla mux para el server y go-randomdata para nombres random

go get -u github.com/gorilla/mux

go get github.com/Pallinder/go-randomdata




 ---------------- Instalar dependencias para compilar el .proto
  sudo apt-get remove protobuf-compiler
$ PB_REL="https://github.com/protocolbuffers/protobuf/releases"
$ curl -LO $PB_REL/download/v3.12.1/protoc-3.12.1-linux-x86_64.zip
$ sudo apt install unzip
$ unzip protoc-3.12.1-linux-x86_64.zip -d HOME/.local
$ export PATH="$PATH:$HOME/.local/bin"
---probar esta sino funciona el anterior    ----------------------   export PATH=$PATH:$GOPATH/bin

PROTOC_ZIP=protoc-3.14.0-linux-x86_64.zip
curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.14.0/$PROTOC_ZIP
sudo unzip -o $PROTOC_ZIP -d /usr/local bin/protoc
sudo unzip -o $PROTOC_ZIP -d /usr/local 'include/*'
rm -f $PROTOC_ZIP

--- el para compilar el archivo demo.proto
export PATH=$PATH:$GOPATH/bin
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/demo.proto









--------- para el backend de Go
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/client-api-go_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/client-api-go_fase2

--crear un contenedor con la imagen que cree 
   docker run -d -p 2000:2000 --restart always --name client -e HOST=34.123.158.31 sergiounix/client-api-go_fase2

   docker run  -p 2000:2000  --name client2 -e HOST=34.123.158.31  sergiounix/client-api-go_fase2


-----inspeccionar network
docker network inspect rmoff_rabbit



-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)