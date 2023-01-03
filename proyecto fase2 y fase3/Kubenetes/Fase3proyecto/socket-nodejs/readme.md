



--------- para el cliente de nodejs
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/server-node-sockets-f3 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/server-node-sockets-f3


  docker run -p 8080:8080  sergiounix/server-node-sockets-f3




-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)






-----------------------------------------------------

--crear namespace
kubectl create namespace squidgame



-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=squidgame

--aca hago el deploy para el archivo deploy-sockets.yaml
   kubectl apply -n squidgame -f deploy-sockets.yaml

--- eliminar una aplicacion  deployment.yml
     kubectl delete -n squidgame -f deploy-sockets.yaml





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