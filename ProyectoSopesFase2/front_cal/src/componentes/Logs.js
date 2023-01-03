import React, {Component, useEffect, useState } from "react";
import axios from 'axios';
import url from '../componentes/Baseurl';
import {io} from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css'

//la url aca va diferente  porque se manda a pedir al app engine
const baseUrl ="https://sopes1-344103.ue.r.appspot.com"

const socket = io (baseUrl)

class Logs extends Component{
  
    constructor (props){
        super(props)
        this.state = {
            courses:[]
        }
    }
    
state={  
}

arrayDatos=[];
dataram1=[];


 
 


guardar=async()=>{
    await axios.post(baseUrl+"/api/logs/all",this.state.form)
       .then(response=>{
           console.log(response.data);
       })
       .catch(error=>{
           console.log(error);
       })
}

mostrarOperaciones = async () => {
    

    socket.emit("request_data");
   

    if (socket) {
        socket.on("receive_result", (data) => {
           // setLogs([...data]);
            console.log(data)

            
            this.arrayDatos=data
            this.setState({});
        });
    }
    this.setState({});
  
    return () => { if (socket) socket.off() }

   
}
 



render(){
   return (
       <React.Fragment>
 
           <div className="container">
               <div className="row">
                   <div className="col-xs-12" id="titulo">
                       <h3 >Get Logs</h3>
                   </div>
               </div>
           </div>
           <div className="container">
               <div className="row align-items-center">
                   <div className="col-xs-12 col-sm-6 col-md-3 fundo-mod margem borda">
                          
                       <div className="justify-content-center centro">
  
  
  <input type="submit" id="botao0" value="Obtener Logs" className="form-control"  onClick={this.mostrarOperaciones}/>
                          
                           
                       </div>
                      
                   </div>
               </div>






            <table className="table">
               <thead className="thead-dark">
                   <tr>
                       <th scope="col">Nombre VM</th>
                       <th scope="col">Endpoint</th>
                       <th scope="col">Date</th>
                       <th scope="col">Total de Memoria</th>
                       <th scope="col">Memoria en Uso</th>
                       <th scope="col">Porcentaje en uso</th>
                       <th scope="col">Memoria libre</th>
                   </tr>
               </thead>
               <tbody>

                   {this.arrayDatos
                       .map((row, index) => (

                       
                           <tr>
                               <td>{row.nombreVM}</td>
                               <td>{row.endpoint}</td>
                               <td>{row.date}</td>

                        {row.data
                          .map((row, index) => (
                               <><td>{row.total}</td><td>{row.memoriaEnUso}</td><td>{row.porcentaje}</td><td>{row.memoriaLibre}</td></>

                               ))}

                           </tr>
                       ))}


               </tbody>
           </table>


               
           </div>

     
      </React.Fragment>
   );
 
 
}
 
 
}
 
export default Logs;