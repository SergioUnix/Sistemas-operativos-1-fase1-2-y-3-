package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"time"
)

const (
	InfoColor    = "\033[1;32m%s\033[0m"
	NoticeColor  = "\033[1;36m%s\033[0m"
	WarningColor = "\033[1;33m%s\033[0m"
	ErrorColor   = "\033[1;31m%s\033[0m"
	DebugColor   = "\033[0;36m%s\033[0m"
)

func main() {
	//PARA LIMPIAR PANTALLA

	fmt.Print("\033[H\033[2J")

	fmt.Printf(ErrorColor, `EJEMPLO: `)
	fmt.Printf(NoticeColor, `rungame --gamename "3|1|2|4|5" --players 100 --rungames 20 --concurrence 8 --timeout 1m`)
	fmt.Println("")
	fmt.Printf(InfoColor, "COMANDO> ")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()

	input := scanner.Text()

	fmt.Printf("")
	fmt.Println("ingreso:", input)

	//var entrada = `rungame --gamename "3|1|2|4|5" --players 100 --rungames 20 --concurrence 8 --timeout 1m`
	//rungame --gamename "1|2|5|1" --players 300 --rungames 1234 --concurrence 23 --timeout 5m

	var cadena = quitarRunGame(input)
	cadena = quitarGuion(cadena)

	var arregloString = obtenerValores(cadena)

	gamename := quitaBarras(arregloString[0])
	fmt.Println(gamename)

	players, _ := strconv.Atoi(arregloString[1])
	fmt.Println(players)

	rungames, _ := strconv.Atoi(arregloString[2])
	fmt.Println(rungames)

	concurrence, _ := strconv.Atoi(arregloString[3])
	fmt.Println(concurrence)

	timeout, _ := strconv.Atoi(arregloString[4])

	for index := 1; index <= concurrence; index++ {
		go thread(index, rungames, gamename, players)
	}

	//tiempo de espera para que finalice el metodo principal
	fmt.Println("Espere a que finalice el Tiempo...")
	time.Sleep(time.Duration(timeout) * time.Minute)
	fmt.Printf(InfoColor, "Finalizo el tiempo ")
	fmt.Println()

}

func enviarPOST(cadena string) {
	reqBody, err := json.Marshal(map[string]string{})

	if err != nil {
		print(err)
	}
	resp, err := http.Post(cadena,
		"application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		print(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		print(err)
	}
	fmt.Println(string(body))
}

func thread(index int, rungames int, randomGames []int, players int) {

	for i := 0; i < rungames; i++ {
		aleatorio := rand.Intn(len(randomGames))
		noJuego := randomGames[aleatorio]
		playersRandom := rand.Intn(players) + 1
		cadena := "http://colas.sop-es-sergio.online/enviarLoadBalancer/game_id/" + strconv.Itoa((noJuego)) + "/players/" + strconv.Itoa((playersRandom))
		fmt.Printf(DebugColor, "DESDE HILO:  "+strconv.Itoa(index)+"  ")

		fmt.Println(cadena)
		enviarPOST(cadena)

		//fmt.Println("Este es el hilo número", index, "ciclo: ", i, "players: ", playersRandom, " noJuego", noJuego)
		time.Sleep(300 * time.Millisecond)
	}
	fmt.Printf(WarningColor, "Finalizo hilo: "+strconv.Itoa(index))
	fmt.Println()

}

func quitaBarras(cadena string) []int {
	var variables []int
	var newCadena = ""
	for _, r := range cadena {

		if string(r) == "|" {
			numero, _ := strconv.Atoi(newCadena)
			variables = append(variables, numero)
			newCadena = ""
		} else {
			newCadena = newCadena + string(r)

		}
	}
	numero, _ := strconv.Atoi(newCadena)
	variables = append(variables, numero)
	return variables
}

func quitarUltimoEspacio(cadena string) string {
	var newCadena = ""
	for cont, r := range cadena {
		if cont < len(cadena)-1 {
			newCadena = newCadena + string(r)
		}
	}
	return newCadena
}
func quitarComillas(cadena string) string {
	var newCadena = ""
	for cont, r := range cadena {

		if cont > 0 && cont < len(cadena)-2 {
			newCadena = newCadena + string(r)
		}
	}
	return newCadena
}

func obtenerValores(cadena string) []string {
	var variables []string

	var newCadena = ""
	var caracter = ""
	for _, r := range cadena {
		caracter = string(r)
		newCadena = newCadena + string(caracter)
		if caracter == " " {
			variables = append(variables, newCadena)
			newCadena = ""
		}
	}
	variables = append(variables, newCadena)

	var variablesSalida []string
	variablesSalida = append(variablesSalida, quitarComillas(variables[1]))
	variablesSalida = append(variablesSalida, quitarUltimoEspacio(variables[3]))
	variablesSalida = append(variablesSalida, quitarUltimoEspacio(variables[5]))
	variablesSalida = append(variablesSalida, quitarUltimoEspacio(variables[7]))
	variablesSalida = append(variablesSalida, quitarUltimoEspacio(variables[9]))

	return variablesSalida

}
func quitarGuion(cadena string) string {
	var newCadena = ""
	for _, r := range cadena {
		caracter := string(r)
		if caracter == "-" {

		} else {
			newCadena = newCadena + string(caracter)
		}
	}
	return newCadena
}

func quitarRunGame(cadena string) string {
	var newCadena = ""
	for cont, r := range cadena {
		if cont >= 8 {
			newCadena = newCadena + string(r)
		}
	}
	return newCadena
}

func consola() {

	//PARA LIMPIAR PANTALLA
	fmt.Print("\033[H\033[2J")
	fmt.Printf(InfoColor, "COMANDO> ")
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()

	input := scanner.Text()

	fmt.Printf("")
	fmt.Println("ingreso:", quitarRunGame(input))
}

func colores() {
	fmt.Printf(InfoColor, "Info")
	fmt.Println("")
	fmt.Printf(NoticeColor, "Notice")
	fmt.Println("")
	fmt.Printf(WarningColor, "Warning")
	fmt.Println("")
	fmt.Printf(ErrorColor, "Error")
	fmt.Println("")
	fmt.Printf(DebugColor, "Debug")
	fmt.Println("")
}
