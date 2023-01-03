--instalar docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


--- correr el docker-compose
docker-compose -f docker-compose.yml up -d

--ingresar a kafka 
docker exec -it kafka /bin/sh

--crear un topic
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic myTopic


--enumerar todos los topic en kafka
kafka-topics.sh --list --zookeeper zookeeper:2181




--repositorio de ayuda
https://github.com/sohamkamani/golang-kafka-example/blob/master/main.go

--pagina para levantar kafka con docker-compose
https://towardsdatascience.com/how-to-install-apache-kafka-using-docker-the-easy-way-4ceb00817d8b



--- instalar kafka en maquina virtual
https://www.ionos.es/digitalguide/servidores/configuracion/apache-kafka-tutorial/




////// --------------------------------  Esto es para dockerizar Kafka ----ESTE FUNCIONO

docker network create rmoff_kafka
docker run --network=rmoff_kafka --rm --detach --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 confluentinc/cp-zookeeper:5.5.0
docker run --network=rmoff_kafka --rm --detach --name broker -p 9092:9092 -e KAFKA_BROKER_ID=1 -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e      KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:5.5.0 


--ingresar a kafka 
docker exec -it broker /bin/sh

--crear un topic
kafka-topics --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic proyecto2

--enumerar todos los topic en kafka
kafka-topics --list --zookeeper zookeeper:2181

------------------- este es para usarlo con docker   broker:9092 sirve para encontrar el localhost 
docker stop broker
docker run --network=rmoff_kafka --rm --detach --name broker  -p 9092:9092  -e KAFKA_BROKER_ID=1  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://broker:9092  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1  confluentinc/cp-kafka:5.5.0




