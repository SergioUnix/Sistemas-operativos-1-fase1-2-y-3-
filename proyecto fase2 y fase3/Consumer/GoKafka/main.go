package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"

	"fmt"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"

	"github.com/gorilla/mux"
	"github.com/segmentio/kafka-go"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"database/sql"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

const (
	topic         = "proyecto2"
	brokerAddress = "localhost:9092"
)

var MONGO = "mongodb://34.122.96.24:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

var clientRedis = redis.NewClient(&redis.Options{
	Addr:     "34.125.12.38:6379",
	Password: "password",
	DB:       0,
})

type KeyBasic struct {
	Game_id   string `json:"game_id"`
	Players   string `json:"players"`
	Game_name string `json:"game_name"`
	Winner    string `json:"winner"`
	Queue     string `json:"queue"`
}

type dados struct {
	Total        string `json:"total"`
	MemoriaEnUso string `json:"memoriaEnUso"`
	MemoriaLibre string `json:"memoriaLibre"`
}

func index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hola desde backend go!\n"))
}

func save(w http.ResponseWriter, r *http.Request) {
	res := "respuesta"
	fmt.Println(res)

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//w.Write(data)
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: "Data alamecenada en la base de datos"})

}

func main() {

	//time.AfterFunc(5*time.Second, consume)
	consume()
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", index)
	router.HandleFunc("/save", save).Methods("POST")
	log.Println("Listening at port 2500")
	log.Fatal(http.ListenAndServe(":2500", router))
}

// Obtener variables de entorno del archivo de configuración
func getEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error al obtener variables de entorno.")
	}
	return os.Getenv(key)
}

func consume() {

	ctx := context.Background()
	// crea un nuevo registrador que sale a stdout
	// y tiene el prefijo `kafka reader`
	l := log.New(os.Stdout, "kafka reader: ", 0)
	// inicializa un nuevo lector con los intermediarios y el tema
	// el groupID identifica al consumidor y previene
	// evita recibir mensajes duplicados
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{getEnvVar("KAFKA_BROKER")},
		Topic:   getEnvVar("TOPIC"),
		GroupID: "my-group",
		// asignar el registrador al lector(masculino)
		Logger: l,
	})
	for {
		// the `ReadMessage` bloques de métodos hasta que recibamos el siguiente evento
		msg, err := r.ReadMessage(ctx)
		if err != nil {
			panic("could not read message " + err.Error())
		} else {

			fmt.Println("si encontro algo ")

			c := KeyBasic{}
			// decodificar el contenido del json sobre la estructura
			err = json.Unmarshal(msg.Value, &c)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println(c.Game_id)

			/////////////////////////// INGRESAR A REDIS

			insertarUltimoJuegoRedis("ultimosJuegos", c.Game_name)
			insertarVictoriaRedis("victorias", c.Winner)
			//mostrarVictoriasRedis("victorias")
			/////////////////

			////////////////////Ingresar a Mongo
			//PARCEO EL JSON
			buf := new(bytes.Buffer)
			buf.ReadFrom(bytes.NewBuffer(msg.Value))
			str := buf.String()

			var doc interface{}
			err := bson.UnmarshalExtJSON([]byte(str), true, &doc)
			if err != nil {
				log.Fatal(err)
			}

			//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
			client, err := mongo.NewClient(options.Client().ApplyURI(MONGO))
			if err != nil {
				log.Fatal(err)
			}
			ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
			err = client.Connect(ctx)
			if err != nil {
				log.Fatal(err)
			}
			defer client.Disconnect(ctx)

			collection := client.Database("fase2DB").Collection("logs")
			res, insertErr := collection.InsertOne(ctx, doc)
			if insertErr != nil {
				log.Fatal(insertErr)
			}
			fmt.Println(res)

			/////////////////////////////////////////// Ingresar a Tidys

			//Paso el string a int
			Game_id, err := strconv.Atoi(c.Game_id)
			if err != nil {
				log.Fatalf("Error al convertir a int: %v", err)
			}
			Players, err := strconv.Atoi(c.Players)
			if err != nil {
				log.Fatalf("Error al convertir a int: %v", err)
			}
			Winner, err := strconv.Atoi(c.Winner)
			if err != nil {
				log.Fatalf("Error al convertir a int: %v", err)
			}
			insertarLogTIDIS(Game_id, Players, c.Game_name, Winner, c.Queue)
			////////////////////////////////////////

		}
		// después de recibir el mensaje, registre su valor
		fmt.Println("received: ", string(msg.Value))
	}
}

func insertarUltimoJuegoRedis(tabla string, idJuego_nombreJuegostring string) {
	// lpush "tabla" "dato_a_ingresar"
	// lpush ultimosJuegos "idJuego-nombreJuego"

	vals, err := clientRedis.LPush(clientRedis.Context(), tabla, idJuego_nombreJuegostring).Result()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(vals)
}

func insertarVictoriaRedis(nombreTabla string, idJugador string) {
	//err = clientRedis.ZIncrBy(clientRedis.Context(), "victorias", 1, "jugadorJosue").Err()
	err := clientRedis.ZIncrBy(clientRedis.Context(), nombreTabla, 1, idJugador).Err()
	if err != nil {
		fmt.Println(err)
	}

}

func mostrarVictoriasRedis(nombreTabla string) {
	// ZREVRANGE "victorias"  0 9 WITHSCORES
	vals, err := clientRedis.ZRevRangeWithScores(clientRedis.Context(), nombreTabla, 0, 9).Result()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(vals)
}

func primeraPruebaRedis() {
	//como hacer PING y conteste PONG para verificar conexion
	pong, err := clientRedis.Ping(clientRedis.Context()).Result()
	fmt.Println(pong, err)

	//insertar un dato sencillo
	err = clientRedis.Set(clientRedis.Context(), "name", "Elliot", 0).Err()
	if err != nil {
		fmt.Println(err)
	}

	//leer un dato sencillo
	val, err := clientRedis.Get(clientRedis.Context(), "name").Result()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(val)

}

func SaveLog(w http.ResponseWriter, r *http.Request) {
	//PARCEO EL JSON
	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)
	str := buf.String()

	var doc interface{}
	err := bson.UnmarshalExtJSON([]byte(str), true, &doc)
	if err != nil {
		log.Fatal(err)
	}

	//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	collection := client.Database("fase2DB").Collection("logs")
	res, insertErr := collection.InsertOne(ctx, doc)
	if insertErr != nil {
		log.Fatal(insertErr)
	}
	fmt.Println(res)

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//w.Write(data)
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje salida"`
	}{Mensaje: "Data alamecenada en la base de datos"})

}

func getLogs(w http.ResponseWriter, r *http.Request) {
	//CONEXION A LA BASE DE DATOS E INSERCION DE DATOS
	client, err := mongo.NewClient(options.Client().ApplyURI(MONGO))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)
	//nombre DB: proyecto1DB
	//nombre Coleccion: logs
	collection := client.Database("fase2DB").Collection("logs")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var data []bson.M
	if err = cursor.All(ctx, &data); err != nil {
		log.Fatal(err)
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatal(err)
	}

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonData)

}

///funcion para insertar a tidis

func insertarLogTIDIS(game_id int, players int, game_name string, winner int, queue string) {
	db, err := sql.Open("mysql", "gonzcaal:password@tcp(34.125.54.35:4000)/fase2DB")
	defer db.Close()

	if err != nil {
		log.Fatal(err)
	}
	var strGameid = strconv.Itoa(game_id)
	var strPlayers = strconv.Itoa(players)
	var strWinner = strconv.Itoa(winner)
	sql := "INSERT INTO logs(game_id, players, game_name, winner, queue) VALUES (" + strGameid + ", " + strPlayers + ", '" + game_name + "', " + strWinner + ", '" + queue + "');"
	res, err := db.Exec(sql)

	if err != nil {
		panic(err.Error())
	}

	lastId, err := res.LastInsertId()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("The last inserted row id: %d\n", lastId)

}
