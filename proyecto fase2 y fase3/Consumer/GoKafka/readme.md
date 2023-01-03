--------- para el consumer de Go de la cola Rabbit
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/kafka-consumer-go_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/kafka-consumer-go_fase2

--crear un contenedor con la imagen que cree 
docker run -d -p 2500:2500 --network=rmoff_kafka --restart always --name consumer-cola-kafka  -e KAFKA_BROKER=broker:9092 sergiounix/kafka-consumer-go_fase2





-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)