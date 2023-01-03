import React, {Component, useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import url from '../componentes/Baseurl';
import CanvasJSReact from '../../src/assets/canvasjs.react';





var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var arrayDatosram1 = [];  
var arrayDatosram2 = [];  


const baseUrl =url
   


class Procesos extends Component{



 


    constructor (props){
      super();

      }
    


state={
   form:{
       Ope1:'',
       Simbolo: '',
       Ope2: '',
       Resultado: '0'

   }
}


arregloProcesos=[];
arregloProcesos_vm2=[];

/*  Ejemplo de ordenamiento
var items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic', value: 13 },
    { name: 'Zeros', value: 37 }
  ];
  items.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  */


mostrarOperaciones = async () => {
    await axios.get(baseUrl+"/getProcesos")
    .then(response=>{
        // console.log(response.data)
        // console.log(this.arregloProcesos[0].nombreVM)
    

         if(response.data[0].nombreVM== "vm1"){
         this.arregloProcesos =response.data
         this.arregloProcesos.sort(function (comodin , iterar){
            if(comodin.pid > iterar.pid){
                return 1;
            }
            if(comodin.pid < iterar.pid){
              return -1;
            }
            return 0;
          });


        }else {
            this.arregloProcesos_vm2 =response.data
            this.arregloProcesos_vm2.sort(function (comodin , iterar){
               if(comodin.pid > iterar.pid){
                   return 1;
               }
               if(comodin.pid < iterar.pid){
                 return -1;
               }
               return 0;
             });
   
        }

        
    })
    .catch(error=>{
        console.log(error);
    })

    this.setState({});
}
 



//componentDidMount = async () => {
//   this.myTimer = setInterval( async () => {

//  await axios.get(baseUrl+"/getProcesos")
//  .then(response=>{
    //console.log([response.data])

 
//})
// .catch(error=>{
//    console.log(error);
// })
// },2000);

// this.setState({});
//}
 






render(){
  const options = {
    title :{
        text: "% de Memoria 1 (azul) y Memoria 2 (rojo)"
    },
    data: [{
        type: "area",
        dataPoints : arrayDatosram1
    },
    {
      type: "area",
      dataPoints : arrayDatosram2
    }
  ]
  }

  
   return (
       <React.Fragment>
           <style>

           </style>
           <div className="container">
               <div className="row">
                   <div className="col-xs-12" id="titulo">
                       <h3>Procesos de Cpu</h3>
                   </div>
               </div>
           </div>
           <div className="container">
               <div className="row align-items-center">
                   <div className="col-xs-12 col-sm-6 col-md-3 fundo-mod margem borda">

                       <div className="justify-content-center centro">


                           <input type="submit" id="botao0" value="visualizar Procesos" className="form-control" onClick={this.mostrarOperaciones} />


                       </div>

                   </div>
               </div>





           </div>



<div className="accordion" id="accordionExample">

<div className="accordion-item">
  <h2 className="accordion-header" id="headingOne">
  <><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                VM_1
            </button></>

  </h2>
  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">

           <table className="table">
               <thead className="thead-dark">
                   <tr>
                       <th scope="col">Maquina</th>
                       <th scope="col">Nombre Proceso</th>
                       <th scope="col">Pid</th>
                       <th scope="col">Estado</th>
                       <th scope="col">Padre</th>
                   </tr>
               </thead>
               <tbody>

                   {this.arregloProcesos
                       .map((row, index) => (


                           <tr>
                               <td>{row.nombreVM}</td>
                               <td>{row.nombre}</td>
                               <td>{row.pid}</td>
                               <td>{row.state}</td>
                               <td>{row.pidpadre}</td>
                           </tr>
                       ))}


               </tbody>
           </table>


           </div>
           </div>

  <div className="accordion-item">
  <h2 className="accordion-header" id="headingDos">
  <><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDos" aria-expanded="true" aria-controls="collapseDos">
                VM_2
            </button></>

  </h2>
  <div id="collapseDos" className="accordion-collapse collapse show" aria-labelledby="headingDos" data-bs-parent="#accordionExample">

           <table className="table">
               <thead className="thead-dark">
                   <tr>
                       <th scope="col">Maquina</th>
                       <th scope="col">Nombre Proceso</th>
                       <th scope="col">Pid</th>
                       <th scope="col">Estado</th>
                       <th scope="col">Padre</th>
                   </tr>
               </thead>
               <tbody>

                   {this.arregloProcesos_vm2
                       .map((row, index) => (


                           <tr>
                               <td>{row.nombreVM}</td>
                               <td>{row.nombre}</td>
                               <td>{row.pid}</td>
                               <td>{row.state}</td>
                               <td>{row.pidpadre}</td>
                           </tr>
                       ))}


               </tbody>
           </table>


  </div>
  </div>

  </div>
      </React.Fragment>
   );
 
 
}
 
 
}
 
export default Procesos;