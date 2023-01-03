package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"bytes"

	"github.com/gorilla/mux"
)

type dados struct {
	Total        string `json:"total"`
	MemoriaEnUso string `json:"memoriaEnUso"`
	MemoriaLibre string `json:"memoriaLibre"`
}

type KeyBasic struct {
	NombreVM string      `json:"nombreVM"`
	Endpoint string      `json:"endpoint"`
	Data     interface{} `json:"data"`
	Date     string      `json:"date"`
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

func getRam(w http.ResponseWriter, r *http.Request) {

	file, err := ioutil.ReadFile("/proc/ram_grupo9.json")
	//file, err := ioutil.ReadFile("/home/sergio/Descargas/ram_grupo9.json")
	if err != nil {
		log.Fatal(err)
	}
	jsonData := string(file)
	fmt.Println(jsonData)

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	manejadorDeArchivo, err := ioutil.ReadFile("/proc/ram_grupo9.json")
	//manejadorDeArchivo, err := ioutil.ReadFile("/home/sergio/Descargas/ram_grupo9.json")

	if err != nil {
		log.Fatal(err)
	}
	// preparar contenedor de las credenciales
	c := KeyBasic{}
	// decodificar el contenido del json sobre la estructura
	err = json.Unmarshal(manejadorDeArchivo, &c)
	if err != nil {
		log.Fatal(err)
	}

	//agrego fecha
	t := time.Now()
	fecha := fmt.Sprintf("%d-%02d-%02dT%02d:%02d:%02d",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	fmt.Println("La fecha actual es =>", fecha)
	c.Date = fecha

	//realizar el calculo de espacio

	fmt.Println(c)
	fmt.Println(c.Data)

	//// convertir de Struct a Json
	e, err := json.Marshal(c)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(e))

	//////////////////////  ACA REALIZO EL POST PARA CLOUD FUNCTION

	resp, err := http.Post("https://us-central1-sopes1-344103.cloudfunctions.net/insertarLog", "application/json",
		bytes.NewBuffer([]byte(e)))
	if err != nil {
		log.Fatal(err)
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	fmt.Println(res["json"])
	//////////////////////

	//retorno el string como json
	w.Write([]byte(e))
}

func getProcesos(w http.ResponseWriter, r *http.Request) {

	file, err := ioutil.ReadFile("/proc/cpu_grupo9.json")
	//file, err := ioutil.ReadFile("/home/sergio/Descargas/cpu_grupo9.json")
	if err != nil {
		log.Fatal(err)
	}
	jsonData := string(file)
	//fmt.Println(jsonData)

	//RESPUESTA
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//retorno el string como json
	w.Write([]byte(jsonData))
}

func main() {
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", index)
	router.HandleFunc("/getDataRam", getRam).Methods("GET")
	router.HandleFunc("/getProcesos", getProcesos).Methods("GET")
	router.HandleFunc("/save", save).Methods("POST")
	log.Println("Listening at port 2000")
	log.Fatal(http.ListenAndServe(":2000", router))
}
