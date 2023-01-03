--tutorial para crear un cluster
  https://www.youtube.com/watch?v=4B_EobzWotw

-- INICIAR CONFIGURACION SDK GOOGLE CLOUD
    gcloud init
-- visualizar la configuracion
    gcloud init

-- visualizar las zonas disponibles en la siguiente pagina
  cloud.google.com/compute/docs/regions-zones


-- elegir la siguiente zona
   us-west1-a    The Dalles, Oregon, Norteamerica  

--correr el siguiente comando para saber en que region vamos a trabajar
    gcloud config set compute/zone us-west1-a


--instalamos para gestionar nuestro kubernetes
    gcloud components install kubectl


--dirigirnos a google cloud console y nos vamos a la opcion 
--   Ir a la descripcion general de las API     y luego a la opcion   HABILITAR API Y SERVICIOS
-- luego buscamos kubernetes y lo habilitamos 



-- visualizamos que tipo de maquinas tenemos 
   cloud.google.com/compute/docs/machine-types

-- usamos maquinas de la familia N1 




------------------------   crear Cluster
gcloud container clusters create cluster1 --num-nodes 3 --machine-type n1-standard-1 --zone us-west1-a 


--visualizamos los nodos
   kubectl get nodes


--ver el estado de un nodo 
    kubectl describe node gke-cluster1-default-pool-7647089b-7ctd


--instalar pluging  para visualizar que servicios se pueden conectar entre si y cuales no
        gcloud container clusters update cluster1 --update-addons=NetworkPolicy=ENABLED

--HABILITAMOS ese pluging instalado anteriormente
   gcloud container clusters update cluster1 --enable-network-policy


--verificar un nodo
        kubectl top node gke-cluster1-default-pool-7647089b-7ctd





--minuto 21:17  creacion de pod en kubernetes
https://www.youtube.com/watch?v=gmFSmzAWcig


--crear pod
    nano app1.yml

-------------------------------contenido para pod--------------------------------
apiVersion: v1

kind: Pod

metadata:
    name: web1
    labels:
      app:web

spec:
   containers:
    - name: front1
       image: httpd:latest
       ports:
          - containerPort: 80
    - name: back1
      image: ubuntu:latest
      command: ["/bin/sh"]
      args: ["-c", "while true; do echo hello; sleep 10; done" ]

--------------------------------------------------------------------------------

---aplicar cambios del pod llamado app1.yml
    kubectl apply -f app1.yml

--- visualizar los pod 
    kubectl get all

--informacion de cada pod
    kubectl describe pod web1

--ver los recursos que consume cada pod
    kubectl top pod web1

-- ver los logs de un pod , como tiene dos contenedores de ultimo poner el nombre del contenedor al que quiero ver los logs
    kubectl logs web1 -c back1


--- acceder a un contenedor dentro de un pod
    kubectl exec web1 -it -c front1 /bin/bash




---- realizando un portforwar , relacionando un puerto de nuestra maquina con un port de kubernetes, el primer port es de la maquina 8080 y el segundo es del pod llamado web1 seria el 80, los 0.0.0.0 serian el localhost si deseo relacionarlo con otra direccion seria de poner ahi la ip de donde quiero relacionar el puerto

    kubectl port-forwar   --adress 0.0.0.0 pod/web1 8080:80


---- como probar lo anterior seria asi
    curl 127.0.0.1:8080 



-------------------CREAR NAMESPACES -----------------
--ver los pods del namespace por default  
    kubectl get all

--- eliminar una aplicacion  app1.yml
    kubectl delete -f app1.yml

-- creo un nuevo app2.yml
   nano app2.yml

-----------------------------contenido app2.yml -----------------------------
apiVersion: v1

kind: Pod

metadata:
    name: web2
    labels:
      app: web

spec:
    containers:
        - name: front1
          image: nginx:latest
          ports:
            - containerPort: 80


---------------------------------------------------------------------------

-- aplicar dos .yml
    kubectl apply -f app1.yml
    kubectl apply -f app2.yml

--- Visualizar los NAMESPACES que tengocluster-1
    kubectl get namespaces

--- creo un nuevo namespace  
    kubectl create namespace nombre-space
    kubectl create namespace rabbits

-- para meter un .yml en un name sapece que he creado 
   kubectl apply -f app2.yml --namesapace=nombre-space

-- si quiero ver los pods de un namespace especifico seria asi
    kubectl get all --namespace=nombre-space

-- si le doy solo asi , me visualiza los pods pero solo los del namespace por default
    kubectl get all


---si quiero fijar un namespace en especifico sin poner a cada rato --namespace lo hago asi
    kubectl config set-context --current --namespace=nombre-space


---eliminar namespaces
kubectl delete namespaces practica2-201020252




------------------ verifico las ips

kubectl get svc --all-namespaces






























-----ayuda 
gcloud config get-value project

gcloud config set project <NOMBRE DEL PROYECTO>

gcloud config set compute/zone us-central1-a

gcloud container clusters create <NOMBRE DEL CLUSTER> --num-nodes=1 --tags=all-in,all-out --machine-type=n1-standard-2 --no-enable-network-policy
