---dentro del cluster creo un namespace
    kubectl create namespace rabbits


--- obtener el almacenamiento aprovisionador local
    kubectl get storageclass


-- para meter un .yaml en un name sapece que he creado 
   kubectl apply -n rabbits -f rabbit-rbac.yaml


--luego aplicamos un secret en el mismo espacio de trabajo
   kubectl apply -n rabbits -f rabbit-secret.yaml


--aplicamos la configuracion de mapeo
   kubectl apply -n rabbits -f rabbit-configmap.yaml


--aca hago la mayoria de configuracion
   kubectl apply -n rabbits -f rabbit-statefulset.yaml


--visualizo los pods del namespace  rabbits
   kubectl -n rabbits get pods

--visualizo el almacenamiendo de cada pod creado anteriormente..
    kubectl -n rabbits get pvc



------------------ verifico las ips

kubectl get svc --all-namespaces