-- si da error al correr estos dos comandos 
   $  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

   $sudo sysctl -p    

------
----------- Para el Fronted
--crear imagen para fronted
  docker build -t sergiounix/front_fase1 .

  --publicar en docker hub la imagen creada
   docker push sergiounix/front_fase1

-- crear contenedor para la imagen 
  docker run -d -p 4200:80 --name frontfase1 sergiounix/front_fase1



--- Para cloud Run
1. primero tener subida la imagen a docker hub
2. luego acceder a la shell de google cloud
3. jalamos la imagen 
   docker pull sergiounix/front_fase1
4. ahora enviarla al registro privado de google ---------'sopesproyecto1'=id del proyecto en el que estoy   ... 'nuevo-front'  nuevo nombre de la imagen
   docker tag sergiounix/front_fase1 gcr.io/sopesproyecto1/nuevo-front:v2
5. revisamos si esta    
  docker image ls
6. antes de enviar la imagen debemos de dar permisos para poder empujar la imagen
   Nos dirigimos a container Registry Api y lo habilitamos
7. tomamos la imagen y la empujamos ya renombrada , al registro privado
   docker push gcr.io/sopesproyecto1/nuevo-front:v2
8. ahora ya esta disponible en todos los recursos de google cloud

9. luego ir a Docker run para correr mi contenedor






-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)
