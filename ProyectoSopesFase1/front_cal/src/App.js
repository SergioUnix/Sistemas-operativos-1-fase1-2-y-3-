import './App.css';
import Logs from './componentes/Logs'
import Grafica from './componentes/Grafica'
import Procesos from './componentes/Procesos'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">

    <ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="#"><Link to="/">Grafica</Link></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#"><Link to="/Procesos">Procesos</Link></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#"><Link to="/Logs">Logs</Link></a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul>


    <Routes>
          <Route exact path='/' element={<Grafica/>}></Route>
          <Route exact path='/Procesos' element={<Procesos/>}></Route>
          <Route exact path='/Logs' element={<Logs/>}></Route>
   </Routes>
   </div>
</Router>
  );
}

//   <Grafica/>  <Procesos/>  
export default App;
