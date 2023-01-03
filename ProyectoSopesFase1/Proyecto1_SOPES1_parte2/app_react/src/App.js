import logo from './logo.svg';
import './App.css';

import io from "socket.io-client";


//para SOCKET
var socket= io.on('localhost:4000', {'forceNew': true});


function App() {
  return (
    <div className="App">
      <script src="/socket.io/socket.io.js"></script>
      <script src="/App.js"></script>
      hola a todos
    </div>
  );
}

export default App;
