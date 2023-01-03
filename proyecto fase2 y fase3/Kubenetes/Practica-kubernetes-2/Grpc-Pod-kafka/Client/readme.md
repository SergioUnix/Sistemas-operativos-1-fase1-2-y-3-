--------- para el cliente de nodejs
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/client-node_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/client-node_fase2

--crear un contenedor con la imagen que cree 
   docker run -d -p 2000:2000 --restart always --name client-node  sergiounix/client-node_fase2



-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)