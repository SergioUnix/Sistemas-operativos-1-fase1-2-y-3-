import React, {Component, useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import url from '../componentes/Baseurl';
import CanvasJSReact from '../../src/assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var arrayDatosram1 = [];  
var arrayDatosram2 = [];  


const baseUrl =url;
   


class Grafica extends Component{



 


    constructor (props){
      super();
     this.updateDraw = this.updateDraw.bind(this);
       


    }
    


state={
   form:{
       Ope1:'',
       Simbolo: '',
       Ope2: '',
       Resultado: '0'

   }
}


users=[];

arregloram1=[];
dataram1=[];
arregloram2=[];
dataram2=[];

 comodin='Ope1';
 op='';

 guardar=async()=>{
    await axios.post(baseUrl+"/people/crear",this.state.form)
       .then(response=>{
           console.log(response.data);
       })
       .catch(error=>{
           console.log(error);
       })
}

mostrarOperaciones = async () => {
    await axios.get(baseUrl+"/getDataRam")
    .then(response=>{


        console.log(response.data)
        console.log(response.data.data[0])

        if(response.data.nombreVM == "vm1"){
          this.arregloram1=[response.data] 
          //asigno el arreglo pequeño
          this.dataram1=[response.data.data[0]]
          //seteo el valor de porcentaje
          this.dataram1[0].porcentaje=(response.data.data[0].memoriaEnUso/response.data.data[0].total)*100 
        }else {
            this.arregloram2=[response.data] 
             //asigno el arreglo pequeño
            this.dataram2=[response.data.data[0]] 
            //seteo el valor de porcenjate 
            this.dataram2[0].porcentaje=(response.data.data[0].memoriaEnUso/response.data.data[0].total)*100
        }

    })
    .catch(error=>{
        console.log(error);
    })

    this.setState({});
}
 



componentDidMount = async () => {
   this.myTimer = setInterval( async () => {

  await axios.get(baseUrl+"/getDataRam")
  .then(response=>{


    if(response.data.nombreVM == "vm1"){
        this.arregloram1=[response.data] 
        //asigno el arreglo pequeño
        this.dataram1=[response.data.data[0]] 
         //seteo el valor de porcentaje
        this.dataram1[0].porcentaje=(response.data.data[0].memoriaEnUso/response.data.data[0].total)*100 

      }else {
          this.arregloram2=[response.data] 
           //asigno el arreglo pequeño
          this.dataram2=[response.data.data[0]] 
           //seteo el valor de porcenjate 
           this.dataram2[0].porcentaje=(response.data.data[0].memoriaEnUso/response.data.data[0].total)*100
       
      }






  //verifico que VM esta entrando 
      if(response.data.nombreVM == "vm1"){
      this.updateDraw(this.dataram1[0].porcentaje)}else {
          
      this.updateDrawram2(this.dataram2[0].porcentaje)}
      //actualizo la pestaña de valores
      this.setState({});
 
})
 .catch(error=>{
    console.log(error);
 })
 },700);

 this.setState({});
}
 




componentWillUnmount() {
  clearInterval(this.hilo);
}
async updateDraw(por) {

  let porcentaje =  por;
  let labelx = "  ";
  arrayDatosram1.push({label: labelx,y: porcentaje});
 // console.log("recibo Arreglo: " , arrayDatosram1.length);
  this.chart.render();
}

async updateDrawram2(por) {

  let porcentaje =  por;
  let labelx = "  ";
  arrayDatosram2.push({label: labelx,y: porcentaje});

  //console.log("recibo Arreglo 222: " , arrayDatosram2.length);
  this.chart.render();
}




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
                       <h3 >ESTADISTICAS</h3>
                   </div>
               </div>
           </div>
           <div className="container">
               <div className="row align-items-center">
                   <div className="col-xs-12 col-sm-6 col-md-3 fundo-mod margem borda">
                          
                       <div className="justify-content-center centro">
  
  
  <input type="submit" id="botao0" value="Obtener Datos de Ram" className="form-control"  onClick={this.mostrarOperaciones}/>
                          
                           
                       </div>
                      
                   </div>
               </div>




               
           </div>






 <div className="accordion" id="accordionExample">

  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">

    {this.arregloram1
       .map((row, index) => (
            <><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {row.nombreVM}
            </button></>
                            ))}         

                             

    </h2>

    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    {this.dataram1
            .map((row, index) => (
        <> <div className="accordion-body">
              <strong>Memoria Total :</strong> {row.total}
           </div>
           <div className="accordion-body">
              <strong>Memoria En Uso :</strong> {row.memoriaEnUso}
           </div>
           <div className="accordion-body">
              <strong>Porcentaje :</strong> {row.porcentaje}
           </div>
           <div className="accordion-body">
              <strong>Memoria Libre :</strong> {row.memoriaLibre}
           </div>
        </>
            ))}

    </div>
  </div>



  <div className="accordion-item">
    <h2 className="accordion-header" id="headingDos">

    {this.arregloram2
       .map((row, index) => (
            <><button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDos" aria-expanded="true" aria-controls="collapseDos">
                {row.nombreVM}
            </button></>
                            ))}         

                             

    </h2>

    <div id="collapseDos" className="accordion-collapse collapse show" aria-labelledby="headingDos" data-bs-parent="#accordionExample">
    {this.dataram2
            .map((row, index) => (
        <> <div className="accordion-body">
              <strong>Memoria Total :</strong> {row.total}
           </div>
           <div className="accordion-body">
              <strong>Memoria En Uso :</strong> {row.memoriaEnUso}
           </div>
           <div className="accordion-body">
              <strong>Porcentaje :</strong> {row.porcentaje}
           </div>
           <div className="accordion-body">
              <strong>Memoria Libre :</strong> {row.memoriaLibre}
           </div>
        </>
            ))}

    </div>
  </div>
  
</div>

     






<div>
   <CanvasJSChart options = {options}  onRef={ref => this.chart = ref} />
</div>












      </React.Fragment>
   );
 
 
}
 
 
}
 
export default Grafica;