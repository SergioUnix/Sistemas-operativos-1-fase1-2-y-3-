package p

import (
	"fmt" 
    "net/http" 
    "log" 
	"encoding/json" 
	"context" 
	"time" 
	"bytes" 
	"go.mongodb.org/mongo-driver/bson" 
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var MONGO = "mongodb://mongoadmin:So1pass1S_2022@34.123.158.31:27017/"

func HelloWorld(w http.ResponseWriter, r *http.Request) {
	//PARCEO EL JSON QUE ME ENVIARON
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

	collection := client.Database("proyectofuncion").Collection("logs")
	res, insertErr := collection.InsertOne(ctx, doc)
		if insertErr != nil {
			log.Fatal(insertErr)
		}
    fmt.Println(res);

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
   	w.Header().Set("Access-Control-Allow-Origin", "*")
   	//w.Write(data)
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: "Data alamecenada en la base de datos"})
}




--- En el go.mod le agregue lo siguiente sin el git de gorilla_mux y la version 1.16 de go


module racarlosdavid.com/goapi

go 1.16

require(
    go.mongodb.org/mongo-driver v1.7.1
)