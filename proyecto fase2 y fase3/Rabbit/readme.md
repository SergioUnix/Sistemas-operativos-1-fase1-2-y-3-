--imagen de rabbit en docker
docker pull rabbitmq


-------crear una network en docker
docker network create rmoff_rabbit


-- correr el contenedor de rabbit con persistencia
docker run -d -v $(pwd)/rabbit-db:/var/lib/rabbitmq --network=rmoff_rabbit --hostname yt-rabbit -p 5672:5672 -p 8081:15672 --restart always --name yt-rabbit rabbitmq:3-management


-- libreria para nodeJs es la siguiente, para utilizar Rabbitmq
npm install amqplib