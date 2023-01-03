package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	pb "github.com/demo/grpc-client/proto"
	"github.com/gorilla/mux"
	"google.golang.org/grpc"

	"bytes"

	"strconv"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

var nombre_api = "default"

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

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("API GO - gRPC Client!\n"))
}

func ObtenerParametros(w http.ResponseWriter, r *http.Request) {
	game_id := mux.Vars(r)["game"] //Obtengo el game_id
	players := mux.Vars(r)["play"] //Obtengo el player
	host := os.Getenv("HOST")

	// preparar contenedor de las credenciales
	ob := KeyBasic{}

	//Paso el Jugador a int
	gameid_, err := strconv.Atoi(game_id)
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}
	//Paso el Jugador a int
	players_, err := strconv.Atoi(players)
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}

	//Seteo valores a un json
	ob.Game_id = gameid_
	ob.Players = players_

	fmt.Println("Pintando  El objeto--------------")
	fmt.Println(ob)

	//// convertir de Struct a Json
	e, err := json.Marshal(ob)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Pintando localhost --------------")
	fmt.Println(host)

	fmt.Println("/n Pintando  El objeto   en formato json --------------")
	fmt.Println(string(e))

	//host := os.Getenv("DIR_MACHINE")  //pergar esto host +":50051"
	/********************************** gRPC llamada al servidor ********************************/
	conn, err := grpc.Dial(host+":50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewOperacionAritmeticaClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	reply, err := c.LlenarJson(ctx, &pb.LlenarRequest{
		GameId:  strconv.Itoa(ob.Game_id),
		Players: strconv.Itoa(ob.Players),
	})

	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	//log.Printf("Greeting: %s", reply.GetResultado())
	/********************************** gRPC ********************************/

	/********************************** Respuesta ********************************/
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
		Server  string `json:"server"`
	}{Mensaje: reply.GetWinner(), Server: nombre_api})
}

func save(w http.ResponseWriter, r *http.Request) {

	host := os.Getenv("HOST")
	//PARCEO EL JSON
	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)
	str := buf.String()

	var doc interface{}
	err := bson.UnmarshalExtJSON([]byte(str), true, &doc)
	if err != nil {
		log.Fatal(err)
	}

	// preparar contenedor de las credenciales
	ob := KeyBasic{}
	// decodificar el contenido del json sobre la estructura
	err = json.Unmarshal([]byte(str), &ob)
	if err != nil {
		log.Fatal(err)
	}

	//Seteo valores a un json
	//ob.Winner = "hellomoto"
	//fmt.Println("Pintando  El objeto--------------")
	//fmt.Println(ob)

	//// convertir de Struct a Json
	e, err := json.Marshal(ob)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Pintando localhost --------------")
	fmt.Println(host)

	fmt.Println("/n Pintando  El objeto   en formato json --------------")
	fmt.Println(string(e))

	//host := os.Getenv("DIR_MACHINE")  //pergar esto host +":50051"
	/********************************** gRPC llamada al servidor ********************************/
	conn, err := grpc.Dial(host+":50051", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewOperacionAritmeticaClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	reply, err := c.LlenarJson(ctx, &pb.LlenarRequest{
		GameId:  strconv.Itoa(ob.Game_id),
		Players: strconv.Itoa(ob.Players),
	})

	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	//log.Printf("Greeting: %s", reply.GetResultado())
	/********************************** gRPC ********************************/

	/********************************** Respuesta ********************************/
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
		Server  string `json:"server"`
	}{Mensaje: reply.GetWinner(), Server: nombre_api})

}

func main() {

	nombre_api = "Client-gRPC"
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/test/client", IndexHandler)
	router.HandleFunc("/enviarLoadBalancer/game_id/{game}/players/{play}", ObtenerParametros).Methods("POST")
	router.HandleFunc("/enviarLoadBalancer", save).Methods("POST")

	log.Println("Listening at port 2000")
	log.Fatal(http.ListenAndServe(":2000", router))
}
