--------- para el consumer de Go de la cola Rabbit
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/rabbit-consumer-go_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/rabbit-consumer-go_fase2

--crear un contenedor con la imagen que cree 
   docker run -d  -p 2500:2500 --network=rmoff_rabbit --restart always --name consumer-cola-rabbit  -e PRODUCER_HOST=2500 -e AMQP_HOST=yt-rabbit:5672 sergiounix/rabbit-consumer-go_fase2

   docker run   -p 2500:2500  --name consumer-cola-rabbit  -e HOST=34.123.158.31  sergiounix/rabbit-consumer-go_fase2


-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)


rabbitmqctl list_queues



----------------------------------------------------------------------
-------------PARA KUBERNETES -----------------------------------------


--crear namespace
kubectl create namespace squidgame



-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=squidgame

--aca hago el deploy para el archivo pod-consumer.yaml
   kubectl apply -n squidgame -f pod-consumer.yaml

--- eliminar una aplicacion  pod-consumer.yml
    kubectl delete -n squidgame -f pod-consumer.yaml