----------- Para el Fronted
--crear imagen para fronted
  docker build -t sergiounix/front_fase2_react .

  --publicar en docker hub la imagen creada
   docker push sergiounix/front_fase2_react

-- crear contenedor para la imagen 
  docker run -d -p 80:80 --name frontfase1 sergiounix/front_fase2_react
  docker run -d -p 8080:8080 --name frontfase1 sergiounix/front_fase2_react





--- Para cloud Run
1. primero tener subida la imagen a docker hub
2. luego acceder a la shell de google cloud
3. jalamos la imagen 
   docker pull sergiounix/front_fase2_react
4. ahora enviarla al registro privado de google ---------'sopesproyecto1'=id del proyecto en el que estoy   ... 'front-fase2'  nuevo nombre de la imagen
   docker tag sergiounix/front_fase2_react gcr.io/sopesproyecto1/front-fase2:v5
5. revisamos si esta    
  docker image ls
6. antes de enviar la imagen debemos de dar permisos para poder empujar la imagen
   Nos dirigimos a container Registry Api y lo habilitamos
7. tomamos la imagen y la empujamos ya renombrada , al registro privado
   docker push gcr.io/sopesproyecto1/front-fase2:v5
8. ahora ya esta disponible en todos los recursos de google cloud

9. luego ir a Docker run para correr mi contenedor






-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)






-- si da error al correr estos dos comandos 
   $  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

   $sudo sysctl -p    





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
