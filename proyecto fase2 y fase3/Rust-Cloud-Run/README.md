

# fuente del repo
https://github.com/zupzup/rust-web-mongodb-example



# Para correr primero hacer esto
   cargo build

# Para correr seria hacer esto
   cargo run


# compilar y subir imagen a docker hub
--me ubico en la carpeta donde esta el dockerfile y le doy, el punto del final tambien, eso  es para crear una imagen 
  docker  build -t sergiounix/server_rust_fase2 .    

--publicar en docker hub la imagen creada
   docker push sergiounix/server_rust_fase2

--crear un contenedor con la imagen que cree 
   docker run -d  -p 8080:8080  --restart always --name server-rust  sergiounix/server_rust_fase2


-----------------------------------Delete contenedores e Imagenes
---parar todos los contenedores de docker corriendo
docker stop $(docker ps -a -q)

--eliminar todos los contenedores de docker parados
docker rm $(docker ps -a -q)


--eliminar todas las imagenes de docker 
docker rmi $(docker images -a -q)






# para Subir a Cloud run

--- Para cloud Run
1. primero tener subida la imagen a docker hub
2. luego acceder a la shell de google cloud
3. jalamos la imagen 
   docker pull sergiounix/server_rust_fase2
4. ahora enviarla al registro privado de google ---------'sopesproyecto1'=id del proyecto en el que estoy   ... 'back-rust'  nuevo nombre de la imagen
   docker tag sergiounix/server_rust_fase2 gcr.io/sopesproyecto1/back-rust:v3
5. revisamos si esta    
  docker image ls
6. antes de enviar la imagen debemos de dar permisos para poder empujar la imagen
   Nos dirigimos a container Registry Api y lo habilitamos
7. tomamos la imagen y la empujamos ya renombrada , al registro privado
   docker push gcr.io/sopesproyecto1/back-rust:v3
8. ahora ya esta disponible en todos los recursos de google cloud

9. luego ir a Docker run para correr mi contenedor












# rust-web-mongodb-example

An example using MongoDB in a Rust Web Service

## Run

```bash
make mongostart

make dev
```

Runs a local mongodb instance using Docker and an HTTP server on http://localhost:8080.

You can then use CRUD operations on the book resource like this:

Fetch all books:

```bash
curl http://localhost:8080/book
```

Create a new book:

```bash
curl -X POST http://localhost:8080/book -d '{"name": "good book", "author": "another", "num_pages": 500, "tags": ["fun"]}' -H "content-type: application/json"
```

Edit a book:

```bash
curl -X PUT http://localhost:8080/book/5f15fd5400b98edc001944c0 -d '{"name": "good book", "author": "another", "num_pages": 500, "tags": ["fun", "long"]}' -H "content-type: application/json"
```

Delete a new book:

```bash
curl -X DELETE http://localhost:8080/book/5f15fd3900789205001944bf
```




para los libros
    fn docto_book(&self, doc: &Document) -> Result<Book> {
        let id = doc.get_object_id(ID)?;
        let name = doc.get_str(NAME)?;
        let author = doc.get_str(AUTHOR)?;
        let num_pages = doc.get_i32(NUM_PAGES)?;
        let added_at = doc.get_datetime(ADDED_AT)?;
        let tags = doc.get_array(TAGS)?;

        let book = Book {
            id: id.to_hex(),
            name: name.to_owned(),
            author: author.to_owned(),
            num_pages: num_pages as usize,
            added_at: *added_at,
            tags: tags
                .iter()
                .filter_map(|entry| match entry {
                    Bson::String(v) => Some(v.to_owned()),
                    _ => None,
                })
                .collect(),
        };
        Ok(book)
    }





######## Data que obtiene en un get
    [
    {
        "id": "62734dd02a67101c73a7c549",
        "game_id": "5",
        "players": "20",
        "game_name": "Game_5",
        "winner": "14",
        "queue": "Rabbit"
    },
    {
        "id": "62734dd12a67101c73a7c54b",
        "game_id": "5",
        "players": "20",
        "game_name": "Game_5",
        "winner": "14",
        "queue": "Rabbit"
    }
]