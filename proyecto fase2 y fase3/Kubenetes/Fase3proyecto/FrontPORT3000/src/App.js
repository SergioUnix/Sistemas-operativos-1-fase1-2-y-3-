import React, { useState } from 'react'
import { io } from 'socket.io-client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const App = () => {
  const {REACT_APP_HOST_NORMAL}=process.env;
  const {REACT_APP_HOST_SOCKET}=process.env;
  
  
  //const urlMongoReporte1 = "http://grpc-pod-h:2000/getLogs"
  const urlMongoReporte1 = `http://${REACT_APP_HOST_NORMAL}/getLogs`
  const urlMongoReporte2 = `http://${REACT_APP_HOST_NORMAL}/getReporte2`
  const urlMongoReporte3 = `http://${REACT_APP_HOST_NORMAL}/getReporte3`
  
    const linksocket = `http://${REACT_APP_HOST_SOCKET}/`

    //const urlMongoReporte1 = "http://localhost:2000/getLogs"
    //const urlMongoReporte2 = "http://localhost:2000/getReporte2"
    //const urlMongoReporte3 = "http://localhost:2000/getReporte3"
  
  
  
  
  
    const [DatosMongoRep1, setDatosMongoRep1] = useState()
  
  
  
    const [MongoReporte2Juegos, setMongoReporte2Juegos] = React.useState([]);
    const [MongoReporte2VecesJugada, setMongoReporte2VecesJugada] = React.useState([]);
  
    const [MongoReporte3Juegos, setMongoReporte3Juegos] = React.useState([]);
    const [MongoReporte3VecesJugada, setMongoReporte3VecesJugada] = React.useState([]);
  
    const fetchApi = async () => {
      const response = await fetch(urlMongoReporte1)
      const responseJSON = await response.json()
      setDatosMongoRep1(responseJSON)
      // para imprimir en consola lo que recibe la api console.log(responseJSON)
    }
  
    function generarGraficaReporte2() {
      setChartData2({
        labels: MongoReporte2Juegos,
        datasets: [{
          label: '--TOP--3',
          data: MongoReporte2VecesJugada,
          backgroundColor: [
            'rgba(53, 162, 235, 0.2)',
  
          ],
          borderColor: [
            'rgba(53, 162, 235, 1)',
  
          ],
          borderWidth: 1
        }]
      })
  
    }
  
    function generarGraficaReporte3() {
      setChartData3({
        labels: MongoReporte3Juegos,
        datasets: [{
          label: 'CANTIDAD DE VECES QUE PASO POR LA COLA',
          data: MongoReporte3VecesJugada,
          backgroundColor: [
            'rgba(53, 162, 235, 0.2)',
  
          ],
          borderColor: [
            'rgba(53, 162, 235, 1)',
  
          ],
          borderWidth: 1
        }]
      })
  
    }
  
    const fetchApi2 = async () => {
      const response = await fetch(urlMongoReporte2)
      const responseJSON = await response.json()
  
  
      var winner = []
      var victorias = []
  
      for (var i = 0; i < responseJSON.length; i++) {
        var datosWinner = responseJSON[i]._id
        var datosVictorias = responseJSON[i].vecesJugada
        winner.push(datosWinner)
        victorias.push(datosVictorias)
      };
  
      setMongoReporte2Juegos(winner)
      setMongoReporte2VecesJugada(victorias.map(String))
    }
  
    const fetchApi3 = async () => {
      const response = await fetch(urlMongoReporte3)
      const responseJSON = await response.json()
  
  
      var winner = []
      var victorias = []
  
  
      for (var i = 0; i < responseJSON.length; i++) {
        var datosWinner = responseJSON[i]._id
        var datosVictorias = responseJSON[i].insercionesRealizadas
        winner.push(datosWinner)
        victorias.push(datosVictorias)
      };
      console.log(winner)
      console.log(victorias.map(String))
      setMongoReporte3Juegos(winner)
      setMongoReporte3VecesJugada(victorias.map(String))
    }
  
    React.useEffect(() => {
      fetchApi()
      fetchApi2()
      fetchApi3()
    }, [])
  
  
  
  
  
    const [chartData, setChartData] = useState({
      datasets: [],
    })
    const [chartOptions, setChartOptions] = useState({});
  
    const [chartData2, setChartData2] = useState({
      datasets: [],
    })
    const [chartOptions2, setChartOptions2] = useState({});
  
    const [chartData3, setChartData3] = useState({
      datasets: [],
    })
    const [chartOptions3, setChartOptions3] = useState({});
  
  
  
    React.useEffect(() => {
      setChartData({
        labels: ['Red'],
        datasets: [{
          label: '# DE PARTIDAS GANADAS',
          data: [100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
  
          ],
          borderColor: [
            'rgba(53, 162, 235, 0.5)',
  
          ],
          borderWidth: 1
        }]
      })
      setChartOptions({
        responsive: true,
        plugins: {
          Legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "EN TIEMPO REAL"
          }
  
        }
  
      })
      setChartData2({
        labels: MongoReporte2Juegos,
        datasets: [{
          label: '# DE PARTIDAS GANADAS',
          data: MongoReporte2VecesJugada,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
  
          ],
          borderColor: [
            'rgba(53, 162, 235, 0.5)',
  
          ],
          borderWidth: 1
        }]
      })
      setChartOptions2({
        responsive: true,
        plugins: {
          Legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "EN TIEMPO REAL"
          }
  
        }
  
      })
  
      setChartData3({
        labels: MongoReporte2Juegos,
        datasets: [{
          label: '# DE PARTIDAS GANADAS',
          data: MongoReporte2VecesJugada,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
  
          ],
          borderColor: [
            'rgba(53, 162, 235, 0.5)',
  
          ],
          borderWidth: 1
        }]
      })
      setChartOptions3({
        responsive: true,
        plugins: {
          Legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "EN TIEMPO REAL"
          }
  
        }
  
      })
  
  
  
    }, [])
  
  
    //variables para las graficas
  
  
    //crear una variable por cada parte del server
    const [JugadoresRedis, setJugadoresRedis] = React.useState([]);
    const [victoriasJugadoresRedis, setvictoriasJugadoresRedis] = React.useState([]);
  
    const [JugadoresTidis, setJugadoresTidis] = React.useState([]);
    const [victoriasJugadoresTidis, setvictoriasJugadoresTidis] = React.useState([]);
  
  
    const [redisMejoresJugadores, setRedisMejoresJugadores] = React.useState([]);
    const [redisUltimosJuegos, setRedisUltimosJuegos] = React.useState([]);
  
  
    const [TidisUltimosJuegos, setTidisUltimosJuegos] = React.useState([]);
    const [TidisMejoresJugadores, setTidisMejoresJugadores] = React.useState([]);
  
  
  
  
  
  
    //no tocar nada de aqui
    React.useEffect(() => {
      const socket = io(linksocket)
      socket.on('connect', () => console.log("CONECTADO DESDE REACT" + socket.id))
      socket.on('connect_error', () => {
        setTimeout(() => socket.connect(), 5000)
      })
      //hasta aca
  
  
      //por aca se reciben los datos que vienen del server y se asignan a las variables
  
      socket.on('RedisMejoresJugadores', data => { setRedisMejoresJugadores(data) })
      socket.on('RedisUltimosJuegos', data => setRedisUltimosJuegos(data))
  
      socket.on('TidisUltimosJuegos', data => setTidisUltimosJuegos(data))
      socket.on('TidisMejoresJugadores', data => setTidisMejoresJugadores(data))
  
  
      socket.on('RedisGrafica', (jugadores, victorias) => {
        setJugadoresRedis(jugadores)
        setvictoriasJugadoresRedis(victorias)
  
      })
  
      socket.on('TidisGrafica', (jugadores, victorias) => {
        setJugadoresTidis(jugadores);
        var salida = victorias.map(String);
  
        setvictoriasJugadoresTidis(salida);
  
      })
  
  
  
  
  
  
      socket.on('disconnect', () => setRedisMejoresJugadores('Servidor de Node no Iniciado'))
  
    }, [])
    return (
  
      <div className="App">
  
  
        <div class="accordion accordion-body" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
  
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                REPORTES REDIS
              </button>
  
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
  
  
  
  
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-info" data-bs-toggle="collapse" href="#RedisReporte1" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE1:</strong> ULTIMOS 10 JUEGOS
                </a>
              </div>
  
  
              <div class="collapse" id="RedisReporte1">
                <div class="card card-body">
                  {/* inicio de tabla RedisReporte1*/}
                  <table id="TablaRedisReporte1" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">NOMBRE DEL JUEGO</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      {
                        redisUltimosJuegos.map((redisUltimosJuegos, J) => {
                          return (
                            <tr key={J}>
                              <td >
                                {'#' + (J + 1)}
                              </td>
                              <td>
                                <span>{redisUltimosJuegos.juego}</span>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  {/* fin  de tabla RedisReporte1 */}
  
  
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-info" data-bs-toggle="collapse" href="#RedisReporte2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE2:</strong> LOS ULTIMOS 10 MEJORES JUGADORES
                </a>
              </div>
  
  
              <div class="collapse" id="RedisReporte2">
                <div class="card card-body">
  
  
                  {/* inicio  de tabla RedisReporte2 */}
                  <table id="TablaRedisReporte2" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">VICTORIAS</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      {
                        redisMejoresJugadores.map((redisMejoresJugadores, i) => {
                          return (
                            <tr key={i}>
                              <td >
                                {"player" + redisMejoresJugadores.jugador}
                              </td>
                              <td>
                                <span>{redisMejoresJugadores.victorias}</span>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
  
                  {/* fin  de tabla RedisReporte2 */}
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-info" data-bs-toggle="collapse" href="#RedisReporte3" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE3:</strong> ESTADISTICAS DEL JUGADOR EN TIEMPO REAL
                </a>
              </div>
  
  
              <div class="collapse" id="RedisReporte3">
                <div class="card card-body">
                  {/* AQUI SE OBTIENE EL VALOR SELECCIONADO Y SE LE ASIGNA A LA VARIABLE  onChange */}
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" selected onChange={(a) => {
                    const obtenerTexto = a.target.selectedIndex;
  
  
  
  
                    setChartData({
                      labels: [JugadoresRedis[obtenerTexto]],
                      datasets: [{
                        label: '# DE PARTIDAS GANADAS',
                        data: [victoriasJugadoresRedis[obtenerTexto]],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
  
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
  
                        ],
                        borderWidth: 1
                      }]
                    })
  
  
  
  
                  }}>
  
                    {
                      JugadoresRedis.map((JugadoresRedis, K) => {
                        return (
                          <option key={K} value={K}>{JugadoresRedis}</option>
                        );
                      })
                    }
                  </select>
  
                  {/* inicio  de GRAFICA RedisReporte3 */}
  
                  <Bar options={chartOptions} data={chartData} />
  
                  {/* fin  de GRAFICA RedisReporte3 */}
                </div>
              </div>
  
  
  
  
  
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                REPORTES TIDIS
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
  
  
  
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-secondary" data-bs-toggle="collapse" href="#TidisReporte1" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE1:</strong> ULTIMOS 10 JUEGOS
                </a>
              </div>
  
  
              <div class="collapse" id="TidisReporte1">
                <div class="card card-body">
  
  
                  {/* inicio de tabla TidisReporte1*/}
                  <table id="TablaTidisReporte1" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">NOMBRE DEL JUEGO</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      {
                        TidisUltimosJuegos.map((TidisUltimosJuegos, J) => {
                          return (
                            <tr key={J}>
                              <td >
                                {'#' + (J + 1)}
                              </td>
                              <td>
                                <span>{TidisUltimosJuegos.game_name}</span>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  {/* fin  de tabla RedisReporte1 */}
  
  
  
  
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-secondary" data-bs-toggle="collapse" href="#TidisReporte2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE2:</strong> LOS ULTIMOS 10 MEJORES JUGADORES
                </a>
              </div>
  
  
              <div class="collapse" id="TidisReporte2">
                <div class="card card-body">
  
  
                  {/* inicio  de tabla TidisReporte2 */}
                  <table id="TablaTidisReporte2" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">VICTORIAS</th>
                      </tr>
                    </thead>
  
                    <tbody>
                      {
                        TidisMejoresJugadores.map((TidisMejoresJugadores, i) => {
                          return (
                            <tr key={i}>
                              <td >
                                {"player" + TidisMejoresJugadores.winner}
                              </td>
                              <td>
                                <span>{TidisMejoresJugadores.victorias}</span>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
  
                  {/* fin  de tabla RedisReporte2 */}
  
  
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-secondary" data-bs-toggle="collapse" href="#TidisReporte3" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE3:</strong> ESTADISTICAS DEL JUGADOR EN TIEMPO REAL
                </a>
              </div>
  
  
              <div class="collapse" id="TidisReporte3">
                <div class="card card-body">
                  {/* _____________________inicio  de GRAFICA RedisReporte3 */}
  
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example" selected onChange={(e) => {
                    const obtenerTexto = e.target.selectedIndex;
  
  
  
  
  
                    setChartData({
                      labels: [JugadoresTidis[obtenerTexto]],
                      datasets: [{
                        label: '# DE PARTIDAS GANADAS',
                        data: [victoriasJugadoresTidis[obtenerTexto]],
                        backgroundColor: [
                          'rgba(53, 162, 235, 0.2)',
  
                        ],
                        borderColor: [
                          'rgba(53, 162, 235, 1)',
  
                        ],
                        borderWidth: 1
                      }]
                    })
  
  
  
  
  
                  }}>
  
                    {
                      JugadoresTidis.map((JugadoresTidis, J) => {
                        return (
                          <option key={J} value={J}>{JugadoresTidis}</option>
                        );
                      })
                    }
                  </select>
                  <Bar options={chartOptions} data={chartData} />
  
                  {/* fin  de GRAFICA RedisReporte3 */}
                </div>
              </div>
  
  
  
  
  
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                REPORTES MONGO
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
  
  
  
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-success" data-bs-toggle="collapse" href="#MongoReporte1" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE1:</strong> TODOS LOS LOGS ALMACENADOS
                </a>
              </div>
  
  
              <div class="collapse" id="MongoReporte1">
                <div class="card card-body">
  
                  {/* inicio  de tabla RedisReporte2 */}
                  <table id="TablaRedisReporte2" class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">GAME_ID</th>
                        <th scope="col">GAME NAME</th>
                        <th scope="col">PLAYERS</th>
                        <th scope="col">QUEUE</th>
                        <th scope="col">REQUEST NUMBER</th>
                        <th scope="col">WINNER</th>
  
                      </tr>
                    </thead>
  
                    <tbody>
                      {!DatosMongoRep1 ? 'cargando...' :
                        DatosMongoRep1.map((DatosMongoRep1, index) => {
                          return (
                            <tr key={index}>
                              <td>{DatosMongoRep1.game_id}</td>
                              <td>{DatosMongoRep1.game_name}</td>
                              <td>{DatosMongoRep1.players}</td>
                              <td>{DatosMongoRep1.queue}</td>
                              <td>{DatosMongoRep1.request_number}</td>
                              <td>{DatosMongoRep1.winner}</td>
  
                            </tr>
                          )
                        })
  
                      }
  
                    </tbody>
                  </table>
  
                  {/* fin  de tabla RedisReporte2 */}
  
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-success" data-bs-toggle="collapse" href="#MongoReporte2" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE2:</strong> GRAFICA DEL TOP 3 DE JUEGOS
                </a>
              </div>
  
  
              <div class="collapse" id="MongoReporte2">
                <div class="card card-body">
  
                  <button onClick={generarGraficaReporte2}>GENERAR GRAFICA</button>
  
  
                  <Bar options={chartOptions2} data={chartData2} />
  
  
  
  
                </div>
              </div>
  
  
              <div class="d-grid gap-2">
                <a class="btn btn-success" data-bs-toggle="collapse" href="#MongoReporte3" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <strong>REPORTE3:</strong> GRAFICA DE COMPARACION DE LOS DOS SUSCRIBERS
                </a>
              </div>
  
  
              <div class="collapse" id="MongoReporte3">
                <div class="card card-body">
  
                  <button onClick={generarGraficaReporte3}>GENERAR GRAFICA</button>
                  <Bar options={chartOptions3} data={chartData3} />
  
                </div>
              </div>
  
  
  
  
            </div>
          </div>
        </div>
  
  
  
  
      </div>
    );
  };
  export default App;