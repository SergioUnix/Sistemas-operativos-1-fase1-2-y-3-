--crear namespace
kubectl create namespace squidgame



-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=squidgame

--aca hago el deploy para el archivo deployment-r-r-s.yaml
   kubectl apply -n squidgame -f deployment-r-r-s.yaml
   kubectl apply -n squidgame -f ingressFront.yaml

--- eliminar una aplicacion  deployment.yml
     kubectl delete -n squidgame -f deployment-r-r-s.yaml
    kubectl delete -n squidgame -f ingressFront.yaml





    ---Instalacion de Ingress ,, debo ir al cluster

    1.ir al cluster en google cloud
    2. acceder al cluster en la termnar de google cloud
    3. instalar los comandos de abajo

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx -n squidgame 

helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx -n squidgame



------------------ verifico las ips

kubectl get svc --all-namespaces

 kubectl port-forwar   --adress 0.0.0.0 svc-react 3000:3000