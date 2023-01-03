-- libreria para nodeJs es la siguiente, para utilizar Rabbitmq ,, este es para el Server
npm install amqplib







--------- para el cliente de nodejs
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/server-node_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/server-node_fase2

--crear un contenedor con la imagen que cree 
   docker run -d  -p 50051:50051 --network=rmoff_rabbit --restart always --name server-node-grcp  -e HOST=0.0.0.0:50051 -e AMQP_HOST=yt-rabbit:5672 sergiounix/server-node_fase2

-----inspeccionar network
docker network inspect rmoff_rabbit


-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)