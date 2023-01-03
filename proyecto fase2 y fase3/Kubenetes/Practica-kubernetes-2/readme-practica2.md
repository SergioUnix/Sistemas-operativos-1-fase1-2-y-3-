------------------ Instalar Kafka con Strimzi

kubectl create namespace kafka

kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka


--crear namespace
kubectl create namespace squidgame


-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=squidgame

--aca hago el deploy para el archivo kafka.yaml
   kubectl apply -n kafka -f kafka.yaml

--aca hago el deploy para el archivo deployment.yaml
   kubectl apply -n squidgame -f deployment.yaml

--aca hago el deploy para el archivo pod-consumer.yaml
   kubectl apply -n squidgame -f pod-consumer.yaml

--- eliminar una aplicacion  deployment.yml
    kubectl delete -n squidgame -f deployment.yaml
    kubectl delete -n squidgame -f pod-consumer.yaml





------------------ verifico las ips

kubectl get svc --all-namespaces