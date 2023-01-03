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

//esto es para obtener los datos desde el Servidor de RUST
const App = () => {
  const todos = [{ "id": "625ef980c0431afee38bf3d3", "game_id": "5", "players": "35", "game_name": "Game_5", "winner": "6", "queue": "Kafka" }, { "id": "625efa54d52e9d0e5df87f79", "game_id": "5", "players": "6", "game_name": "Game_5", "winner": "1", "queue": "Rabbit" }, { "id": "625efc0ed52e9d0e5df87f7b", "game_id": "5", "players": "6", "game_name": "Game_5", "winner": "0", "queue": "Rabbit" }, { "id": "625efcffd52e9d0e5df87f7d", "game_id": "5", "players": "6", "game_name": "Game_5", "winner": "4", "queue": "Rabbit" }, { "id": "625f0169c0431afee38bf3d5", "game_id": "3", "players": "81", "game_name": "Game_3", "winner": "41", "queue": "Kafka" }, { "id": "625f0170c0431afee38bf3d7", "game_id": "4", "players": "2", "game_name": "Game_4", "winner": "1", "queue": "Kafka" }, { "id": "625f0171c0431afee38bf3d9", "game_id": "4", "players": "65", "game_name": "Game_4", "winner": "37", "queue": "Kafka" }, { "id": "625f0174c0431afee38bf3db", "game_id": "3", "players": "70", "game_name": "Game_3", "winner": "49", "queue": "Kafka" }, { "id": "625f017ec0431afee38bf3dd", "game_id": "5", "players": "43", "game_name": "Game_5", "winner": "6", "queue": "Kafka" }, { "id": "625f017fc0431afee38bf3df", "game_id": "3", "players": "92", "game_name": "Game_3", "winner": "78", "queue": "Kafka" }, { "id": "625f0181c0431afee38bf3e1", "game_id": "1", "players": "98", "game_name": "Game_1", "winner": "45", "queue": "Kafka" }, { "id": "625f0182c0431afee38bf3e3", "game_id": "1", "players": "19", "game_name": "Game_1", "winner": "0", "queue": "Kafka" }, { "id": "625f0183c0431afee38bf3e5", "game_id": "5", "players": "95", "game_name": "Game_5", "winner": "76", "queue": "Kafka" }, { "id": "625f0184c0431afee38bf3e7", "game_id": "2", "players": "84", "game_name": "Game_2", "winner": "36", "queue": "Kafka" }, { "id": "625f0185c0431afee38bf3e9", "game_id": "1", "players": "41", "game_name": "Game_1", "winner": "28", "queue": "Kafka" }, { "id": "625f0186c0431afee38bf3eb", "game_id": "2", "players": "57", "game_name": "Game_2", "winner": "55", "queue": "Kafka" }, { "id": "625f0187c0431afee38bf3ed", "game_id": "1", "players": "96", "game_name": "Game_1", "winner": "66", "queue": "Kafka" }]
  const url = "https://back-rust-t3qi3cptsa-uc.a.run.app/getLogsss"
  //const [todos, setTodos]=useState()

 // var insertadosKafka = 0
 // var insertadosRabbit = 0

  //function contarRust(elements) {
   // insertadosKafka = 0
   // insertadosRabbit = 0
   // for (var i = 0; i < elements.length; i++) {
   //   console.log(elements[i].queue)
   //   if (elements[i].queue==="Kafka"){
  //      insertadosKafka++;
  //    }
  //    if (elements[i].queue==="Rabbit"){
  //      insertadosRabbit++;
  //    }
  //  }
    
   // return 0;
 //}

//contarRust(todos)
//console.log("kafka:" +insertadosKafka)
//console.log("rabbit" + insertadosRabbit)


  const fetchApi = async () => {
    const response = await fetch(url, {
      'mode': 'cors',
      'headers': {
        'Access-Control-Allow-Origin': '*',
      }
    })
    const responseJSON = await response.json()
    //setTodos(responseJSON)
    console.log(responseJSON)
  }




  const [chartData, setChartData] = useState({
    datasets: [],
  })
  const [chartOptions, setChartOptions] = useState({});


  React.useEffect(() => {
    fetchApi()
  }, [])


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
          'rgba(255, 99, 132, 1)',

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
          text: "JUGADOR SELECCIONADO EN TIEMPO REAL DESDE REDIS"
        }

      }

    })
  }, [])


  const [chartDataTidis, setChartDataTidis] = useState({
    datasets: [],
  })
  const [chartOptionsTidis, setChartOptionsTidis] = useState({});

  React.useEffect(() => {
    setChartDataTidis({
      labels: ['Red'],
      datasets: [{
        label: '# DE PARTIDAS GANADAS',
        data: [100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1
      }]
    })
    setChartOptionsTidis({
      responsive: true,
      plugins: {
        Legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "JUGADORES EN TIEMPO REAL DESDE TIDIS"
        }

      }

    })
  }, [])

  //variables para las graficas


  //crear una variable por cada parte del server
  const [ListaJugadores, setListaJugadores] = React.useState([]);
  const [redisMejoresJugadores, setRedisMejoresJugadores] = React.useState([]);
  const [redisUltimosJuegos, setRedisUltimosJuegos] = React.useState([]);


  const [TidisUltimosJuegos, setTidisUltimosJuegos] = React.useState([]);
  const [TidisMejoresJugadores, setTidisMejoresJugadores] = React.useState([]);






  //no tocar nada de aqui
  React.useEffect(() => {
    const socket = io('https://sopes1-344103.ue.r.appspot.com/')
    socket.on('connect', () => console.log("CONECTADO DESDE REACT" + socket.id))
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })
    //hasta aca


    //por aca se reciben los datos que vienen del server y se asignan a las variables
    socket.on('ListaJugadores', data => setListaJugadores(data))
    socket.on('RedisMejoresJugadores', data => setRedisMejoresJugadores(data))
    socket.on('RedisUltimosJuegos', data => setRedisUltimosJuegos(data))

    socket.on('TidisUltimosJuegos', data => setTidisUltimosJuegos(data))
    socket.on('TidisMejoresJugadores', data => setTidisMejoresJugadores(data))


    socket.on('RedisGrafica', (jugadores, victorias) => {

      setChartData({
        labels: jugadores,
        datasets: [{
          label: '# DE PARTIDAS GANADAS',
          data: victorias,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
        }]
      })
    })

    socket.on('TidisGrafica', (jugadores, victorias) => {

      setChartDataTidis({
        labels: jugadores,
        datasets: [{
          label: '# DE PARTIDAS GANADAS',
          data: victorias,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
        }]
      })

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
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" selected onChange={(e) => {
                  const obtenerTexto = e.target.value;

                  chartData.datasets[0].data[0] = obtenerTexto;






                }}>
                  <option >Seleccione el Jugador</option>
                  {
                    ListaJugadores.map((ListaJugadores, J) => {
                      return (
                        <option key={J} value={ListaJugadores.juego}>{ListaJugadores.nombreJugador}</option>
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

                {/* inicio  de GRAFICA RedisReporte3 */}
                <Bar options={chartOptionsTidis} data={chartDataTidis} />
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
                <strong>REPORTE1:</strong> ULTIMOS 10 JUEGOS
              </a>
            </div>


            <div class="collapse" id="MongoReporte1">
              <div class="card card-body">

                {/* inicio  de tabla RedisReporte2 */}
                <table id="TablaRedisReporte2" class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">GAME_ID</th>
                      <th scope="col">PLAYER</th>
                      <th scope="col">GAME NAME</th>
                      <th scope="col">WINNER</th>
                      <th scope="col">QUEUE</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!todos ? 'cargando...' :
                      todos.map((todos, index) => {
                        return (
                          <tr>
                            <td>{todos.game_id}</td>
                            <td>{todos.players}</td>
                            <td>{todos.game_name}</td>
                            <td>{todos.winner}</td>
                            <td>{todos.queue}</td>
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
                <strong>REPORTE2:</strong> LOS ULTIMOS 10 MEJORES JUGADORES
              </a>
            </div>


            <div class="collapse" id="MongoReporte2">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
              </div>
            </div>


            <div class="d-grid gap-2">
              <a class="btn btn-success" data-bs-toggle="collapse" href="#MongoReporte3" role="button" aria-expanded="false" aria-controls="collapseExample">
                <strong>REPORTE3:</strong> ESTADISTICAS DEL JUGADOR EN TIEMPO REAL
              </a>
            </div>


            <div class="collapse" id="MongoReporte3">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
              </div>
            </div>




          </div>
        </div>
      </div>




    </div>
  );
};
export default App;
