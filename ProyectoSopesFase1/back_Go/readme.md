----------para el backend de la ram1
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/backend_fase1_ram1 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/backend_fase1_ram1

--crear un contenedor con la imagen que cree 
   docker run -d -p 2000:2000 --restart always --name ram1  sergiounix/backend_fase1_ram1




--------- para el backend de la ram2
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/backend_fase1_ram2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/backend_fase1_ram2

--crear un contenedor con la imagen que cree 
   docker run -d -p 2000:2000 --restart always --name ram2  sergiounix/backend_fase1_ram2



-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)





 _____________________Empezar a usar Go Mod en nuestro proyecto

Ahora ya lo tenemos activado, pero queremos poder empezar a usarlo, nada más sencillo que ejecutar el siguiente comando en nuestra consola

$ go mod init <modulename>


Descarguemos las dependencias

Una vez hemos inicializado Go Modules en nuestro proyecto, podemos descargar las dependencias del mismo, esto servirá tanto para la primera vez como para cada vez que añadamos una nueva dependencia.

$ go mod tidy


________________________________-







--descargo mongo, para docker, la imagen
  docker pull mongo

-- una vez corriendo el backend en go  , debemos de correr un contenedor con go
   docker run --restart always -d -p 27017:27017 --name dbmongo \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=So1pass1S_2022 \
    mongo

--para que el contenedor corra eternamente podemos usar este comando, si linux lo apaga
# docker run --restart always --name dbmongo nombre_imagen

 -- PARA USAR VOLUMEN SERIA LO SIGUIENTE
    docker run --restart always -d -p 27017:27017 -v /Users/dockerVolumens:/data/db --name dbmongo \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=So1pass1S_2022 \
    mongo


    docker run -d -p 27017:27017 -v /Users/dockerVolumens:/data/db --name dbmongo4.2p \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=So1pass1S_2022 \
    mongo:4.2


--acceder al contenedor de mongo
docker exec -it some-mongo bash
--ingresar a mongo
  mongo localhost/admin -u mongoadmin -p

	usr      = "mongoadmin"
	pwd      = "So1pass1S_2022"
