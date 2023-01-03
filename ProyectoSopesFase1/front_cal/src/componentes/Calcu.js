import React, {Component, useEffect, useState } from "react";
import axios from 'axios';
import url from '../componentes/Baseurl';
const baseUrl =url
const list_oper={
}
    



class Calcu extends Component{
  
    constructor (props){
        super(props)
        this.state = {
            courses:[]
        }
    }
    
state={
   form:{
       Ope1:'',
       Simbolo: '',
       Ope2: '',
       Resultado: '0'

   }
}


users=[
   
 ];


 comodin='Ope1';
 op='';

 
 
 
handleChange=async e=>    {
 if([e.target.name]=='Simbolo'){
       this.comodin='Ope2';       
       }


   await this.setState({ 
         form:{
             ...this.state.form,
             [e.target.name]:e.target.value
         }
 
       });

    console.log(this.state.form);
}

 
handleChangeReset=async e=>    {
         this.comodin='Ope1';
         this.op= '';
  await this.setState({

         form:{
             ...this.state.form,
           Ope1:'',
           Simbolo: '',
           Ope2: '',
           Resultado: ''
         }

         
 
       });
    console.log(this.state.form);
}

handleConcat=async e=>    {
   const valor1=this.state.form.Ope1;
   const valor2=this.state.form.Ope2;
   
 
if([e.target.name]== 'Ope1'){
    
   await this.setState({
 
         form:{
             ...this.state.form,
           [e.target.name]:valor1+e.target.value
         }
 
       });


}else{

 await this.setState({
        
         form:{
             ...this.state.form,
           [e.target.name]:valor2+e.target.value
         }
 
       });
    

}

    var el = document.getElementById("visor");
   
   if([e.target.name]== 'Ope1'){
   el.value= this.state.form.Ope1;} else{ el.value= this.state.form.Ope2;}
   console.log(el);
    console.log(this.state.form);


  
}



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
    await axios.get(baseUrl+"/GetAll")
    .then(response=>{
         console.log(response.data)
         console.log(this.users)
         this.users =response.data
         console.log(this.users)
    })
    .catch(error=>{
        console.log(error);
    })

    this.setState({});
}
 



render(){
   return (
       <React.Fragment>
       <style>
          
           </style>
           <div className="container">
               <div className="row">
                   <div className="col-xs-12" id="titulo">
                       <h3 >Calculadora Básica</h3>
                   </div>
               </div>
           </div>
           <div className="container">
               <div className="row align-items-center">
                   <div className="col-xs-12 col-sm-6 col-md-3 fundo-mod margem borda">
                          
                       <div className="justify-content-center centro">
  
  
  
                          
                           <table className="table table-dark">
                               <tr>
                                  
                                   <td colSpan="4" ><div id="historico" ></div></td>
                               </tr>
                               <tr>
                                  
                                   <td colSpan="4"><input type="text"  name="visor" value={this.op} id="visor" className="col-xs-12 col-sm-12 col-md-12" /></td>
                               </tr>
                               <tr>
                                   <td><input type="button" id="botao7" value="7" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao8" value="8" className="form-control" name={this.comodin}  onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao9" value="9" className="form-control" name={this.comodin}  onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao/" value="/" className="form-control" name="Simbolo" onClick={this.handleChange}/></td>
                               </tr>
                               <tr>
                                   <td><input type="button" id="botao4" value="4" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao5" value="5" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao6" value="6" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao*" value="*" className="form-control" name="Simbolo" onClick={this.handleChange}/></td>
                               </tr>
                               <tr>
                                   <td><input type="button" id="botao1" value="1" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao2" value="2" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao3" value="3" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao-" value="-" className="form-control" name="Simbolo" onClick={this.handleChange}/></td>
                               </tr>
                               <tr>
                                   <td><input type="button" id="botao0" value="0" className="form-control" name={this.comodin} onClick={this.handleConcat}/></td>
                                   <td><input type="button" id="botao=" value="=" className="form-control" onClick={this.guardar}/></td>
                                   <td><input type="button" id="botaoC" value="C" className="btn btn-danger mesmo-tamanho" onClick={this.handleChangeReset}/></td>
                                   <td><input type="button" id="soma" value="+" className="form-control" name="Simbolo" onClick={this.handleChange}/></td>
                               </tr>
  
                               <tr>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td><input type="submit" id="botao0" value="Obtener Historial" className="form-control"  onClick={this.mostrarOperaciones}/></td>
                               </tr>
                           </table>
                       </div>
                      
                   </div>
               </div>




               <table className="table table-dark">
                               <tr>
                                   <td>ID</td>
                                   <td>operacion 1</td>
                                    <td>simbolo</td>
                                   <td>operacion 2</td>                        
                                   <td>resultado</td>
                               </tr>
               {this.users
                        .map((row, index) => (
                               <tr>
                                   <td>{row.id}</td>
                                   <td>{row.ope1}</td>
                                   <td>{row.simbolo}</td>
                                   <td>{row.ope2}</td>
                                   <td>{row.resultado}</td>
                                   
                               </tr>
                          ))}
  
                           </table>






               
           </div>

     
      </React.Fragment>
   );
 
 
}
 
 
}
 
export default Calcu;