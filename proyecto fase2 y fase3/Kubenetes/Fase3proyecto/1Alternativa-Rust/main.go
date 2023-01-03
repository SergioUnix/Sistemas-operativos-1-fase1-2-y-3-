package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"

	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var nombre_api = "default"
var MONGO = "mongodb://34.122.96.24:27017/?readPreference=primary&directConnection=true&ssl=false"

type KeyBasic struct {
	Game_id int `json:"game_id"`
	Players int `json:"players"`
}

// Obtener variables de entorno del archivo de configuración
func getEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error al obtener variables de entorno.")
	}
	return os.Getenv(key)
}

func index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hola desde backend go!\n"))
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

	/********************************** Respuesta ********************************/
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//json.NewEncoder(w).Encode(jsonData)
	w.Write(jsonData)

}

func getReporte2(w http.ResponseWriter, r *http.Request) {
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

	groupStage := bson.D{{"$group", bson.D{{"_id", "$game_name"}, {"vecesJugada", bson.D{{"$sum", 1}}}}}}
	sortStage := bson.D{{"$sort", bson.D{{"vecesJugada", -1}}}}
	limitStage := bson.D{{"$limit", 3}}

	showInfoCursor, err := collection.Aggregate(ctx, mongo.Pipeline{groupStage, sortStage, limitStage})
	if err != nil {
		panic(err)
	}

	var showsWithInfo []bson.M
	if err = showInfoCursor.All(ctx, &showsWithInfo); err != nil {
		panic(err)
	}

	jsonData, err := json.Marshal(showsWithInfo)
	if err != nil {
		log.Fatal(err)
	}

	/********************************** Respuesta ********************************/
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//json.NewEncoder(w).Encode(jsonData)
	w.Write(jsonData)

}

func getReporte3(w http.ResponseWriter, r *http.Request) {
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

	groupStage := bson.D{{"$group", bson.D{{"_id", "$queue"}, {"insercionesRealizadas", bson.D{{"$sum", 1}}}}}}

	showInfoCursor, err := collection.Aggregate(ctx, mongo.Pipeline{groupStage})
	if err != nil {
		panic(err)
	}

	var showsWithInfo []bson.M
	if err = showInfoCursor.All(ctx, &showsWithInfo); err != nil {
		panic(err)
	}

	jsonData, err := json.Marshal(showsWithInfo)
	if err != nil {
		log.Fatal(err)
	}

	/********************************** Respuesta ********************************/
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	//json.NewEncoder(w).Encode(jsonData)
	w.Write(jsonData)

}

func main() {

	nombre_api = "Client-gRPC"
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", index)
	router.HandleFunc("/getLogs", getLogs).Methods("GET")
	router.HandleFunc("/getReporte2", getReporte2).Methods("GET")
	router.HandleFunc("/getReporte3", getReporte3).Methods("GET")

	log.Println("Listening at port 2000")
	log.Fatal(http.ListenAndServe(":2000", router))

}
