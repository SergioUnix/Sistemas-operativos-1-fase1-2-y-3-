package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"os"
	"strconv"

	"math/rand"

	pb "github.com/demo/grpc-server/proto"
	"google.golang.org/grpc"

	"github.com/joho/godotenv"
	"github.com/segmentio/kafka-go"
)

var ctx = context.Background()

const (
	topic         = "proyecto2"
	brokerAddress = "localhost:9092"
	//brokerAddress = "34.71.136.31:9092"
)

type server struct {
	pb.UnimplementedOperacionAritmeticaServer
}

type KeyBasic struct {
	Game_id   string `json:"game_id"`
	Players   string `json:"players"`
	Game_name string `json:"game_name"`
	Winner    string `json:"winner"`
	Queue     string `json:"queue"`
}

func (s *server) OperarValores(ctx context.Context, in *pb.OperacionRequest) (*pb.OperacionReply, error) {
	log.Printf("Se va a %v : el valor %v con el valor %v", in.GetOperacion(), in.GetValor1(), in.GetValor2())

	//Paso el valor1 a int
	intValor1, err := strconv.Atoi(in.GetValor1())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}
	//Paso el valor2 a int
	intValor2, err := strconv.Atoi(in.GetValor2())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}

	var result = 0
	if in.GetOperacion() == "suma" {
		result = suma(intValor1, intValor2)
	} else if in.GetOperacion() == "resta" {
		result = resta(intValor1, intValor2)
	} else if in.GetOperacion() == "multiplicacion" {
		result = multiplicacion(intValor1, intValor2)
	} else if in.GetOperacion() == "division" {
		result = division(intValor1, intValor2)
	}

	strResultado := strconv.Itoa(result)
	//log.Printf("Received: %v", in.GetOperacion())
	return &pb.OperacionReply{Resultado: "El resultado al realizar la " + in.GetOperacion() + " es: " + strResultado}, nil
}

func (s *server) LlenarJson(ctx context.Context, in *pb.LlenarRequest) (*pb.LlenarReply, error) {
	//	log.Printf("El id del juego es %v y el numero de jugadores es %v", in.GetGameId(), in.GetPlayers())

	//Paso el Id_game a int
	intIdJuego, err := strconv.Atoi(in.GetGameId())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}
	//Paso el Jugador a int
	intJugadores, err := strconv.Atoi(in.GetPlayers())
	if err != nil {
		log.Fatalf("Error al convertir a int: %v", err)
	}

	var ganador = 0
	game_name := "game_name"

	if intIdJuego == 1 {
		game_name = "Game_1"
		ganador = game1(intJugadores)
	} else if intIdJuego == 2 {
		game_name = "Game_2"
		ganador = game2(intJugadores)
	} else if intIdJuego == 3 {
		game_name = "Game_3"
		ganador = game3(intJugadores)
	} else if intIdJuego == 4 {
		game_name = "Game_4"
		ganador = game4(intJugadores)
	} else if intIdJuego == 5 {
		game_name = "Game_5"
		ganador = game5(intJugadores)
	}

	strResultado := strconv.Itoa(ganador)
	//log.Printf("Received: %v", in.GetOperacion())

	//// Llenar el struct con la informacion
	ob := KeyBasic{}

	ob.Game_id = in.GetGameId()
	ob.Players = in.GetPlayers()
	ob.Game_name = game_name
	ob.Winner = strconv.Itoa(ganador)
	ob.Queue = "Kafka"

	log.Printf("El arreglo es :  %v", ob) ///aca el objeto es un struct

	///////////////////// ACA DEBO INGRESAR A LA QUEUE
	//// convertir de Struct a Json
	e, err := json.Marshal(ob)
	if err != nil {
		fmt.Println(err)
	}
	produce([]byte(string(e)))
	////////////////////////////////////
	//leer()

	return &pb.LlenarReply{Winner: "El Ganador del juego  " + game_name + " es : " + strResultado}, nil
}

func main() {

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	fmt.Println(string(lis.Addr().String()))
	s := grpc.NewServer()
	pb.RegisterOperacionAritmeticaServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}

func suma(num1, num2 int) int {
	return num1 + num2
}

func resta(num1, num2 int) int {
	return num1 - num2
}

func multiplicacion(num1, num2 int) int {
	return num1 * num2
}

func division(num1, num2 int) int {
	return num1 / num2
}

func game1(TotalJugadores int) int {
	return rand.Intn(TotalJugadores)
}
func game2(TotalJugadores int) int {
	return rand.Intn(TotalJugadores)
}
func game3(TotalJugadores int) int {
	return rand.Intn(TotalJugadores)
}
func game4(TotalJugadores int) int {
	return rand.Intn(TotalJugadores)
}
func game5(TotalJugadores int) int {
	return rand.Intn(TotalJugadores)
}

// Obtener variables de entorno del archivo de configuración
func getEnvVar(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error al obtener variables de entorno.")
	}
	return os.Getenv(key)
}

func produce(msg []byte) error {
	// intialize the writer with the broker addresses, and the topic
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{getEnvVar("KAFKA_BROKER")},
		Topic:   getEnvVar("TOPIC"),
	})

	err := w.WriteMessages(ctx, kafka.Message{
		// create an arbitrary message payload for the value
		//Value: []byte("this is message" + strconv.Itoa(i)),
		Value: msg,
	})

	if err != nil {
		return err
	}
	return nil
}

func leer() error {

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{getEnvVar("KAFKA_BROKER")},
		Topic:   getEnvVar("TOPIC"),
	})

	// the `ReadMessage` method blocks until we receive the next event
	msg, err := r.ReadMessage(ctx)
	if err != nil {
		panic("could not read message " + err.Error())
	}
	// after receiving the message, log its value
	fmt.Println("received: ", string(msg.Value))

	log.Printf("Mensajes recibidos... To exit press CTRL+C")
	return nil
}
