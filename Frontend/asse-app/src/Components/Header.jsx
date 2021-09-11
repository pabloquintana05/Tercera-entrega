import React from 'react';
import Image1 from '../Images/fcn_hcolonia.jpg';
import Image2 from '../Images/Hospital-777x437.jpg';
import Image3 from '../Images/fcn.png';
import '../Components/Header.css';

//Importo las imagenes que van en Header del index y el css correspondiente
export default function Header (props)  {
    //Si el parametro que viene es igual a index, dibujo todo con la animacion de las imagenes
    if (props.tipo === "index"){
        return (
            <header className="header">
               
               <img style={{width:"300px", height: "49px" }} src="https://www.asse.com.uy/plantillas/temas/default/imagenes/logoblanco.svg"  alt='Logo'/> 
               <img id="imagen1" className="animado" style={{width:"200px", height: "100px" }} src={Image1} alt='imagen'/>
               <img id="imagen2" className="animado2" style={{width:"200px", height: "100px" }} src={Image2} alt= 'imagen2'/>
               <img id="imagen3" className="animado3" style={{width:"200px", height: "100px" }} src={Image3} alt='imagen3'/>
            </header>        
        )
    //sino dibujo solo el header con el logo de ASSE    
    } else {
        return (
            <header className="header">
                <img style={{width:"300px", height: "49px" }} src="https://www.asse.com.uy/plantillas/temas/default/imagenes/logoblanco.svg"  alt='Logo'/>
            </header>
        )
    }            
}
