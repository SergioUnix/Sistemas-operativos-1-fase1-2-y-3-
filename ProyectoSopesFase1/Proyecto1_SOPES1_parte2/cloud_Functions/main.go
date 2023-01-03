package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//nombre DB: proyecto1DB
//nombre Coleccion: logs
var userName = "root"
var pass = "root"
var host = "localhost:27017" //SE indica el puerto
var MONGO = "mongodb://" + userName + ":" + pass + "@" + host + "/"

func index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hola desde backend go!\n"))
}

func save(w http.ResponseWriter, r *http.Request) {
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

	collection := client.Database("proyecto1DB").Collection("logs")
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
	collection := client.Database("proyecto1DB").Collection("logs")

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

func main() {
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", index)
	router.HandleFunc("/getLogs", getLogs).Methods("GET")
	router.HandleFunc("/save", save).Methods("POST")
	log.Println("Listening at port 2000")
	log.Fatal(http.ListenAndServe(":2000", router))
}
