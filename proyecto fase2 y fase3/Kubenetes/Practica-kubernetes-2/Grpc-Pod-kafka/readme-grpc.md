--crear namespace
kubectl create namespace squidgame



-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=squidgame


   kubectl apply -n squidgame -f ingressKafka100.yaml

    kubectl delete -n squidgame -f ingressKafka100.yaml





    ---Instalacion de Ingress ,, debo ir al cluster

    1.ir al cluster en google cloud
    2. acceder al cluster en la termnar de google cloud
    3. instalar los comandos de abajo

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx -n squidgame 

helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx -n squidgame



------------------ verifico las ips

kubectl get svc --all-namespaces