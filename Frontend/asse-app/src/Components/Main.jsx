import React, {useState} from 'react';

import '../Components/Main.css';
import Chat from '../Pages/Chat';

export default function Main() {
    const [nombreP, setnombreP] = useState("");  
    const [apellidoP, setapellidoP] = useState("");
    const [documentoP, setdocumentoP] = useState("");
    const [registrado, setregistrado] = useState(false);
    
  
    const handleEnviaralchat =  () => {
        console.log("llego");
        if (nombreP !== ""){
            setregistrado(true);

        }
        //history.push({
        //  pathname: "/Chat",
        //  state: {nombreP: nombreP},
        //})
           
       // history.push(`/Chat?nombre=${nombreP}`);    
        
    } 
    return (
        
        <main className="contenido">
    
            <h2>Comunicarse en linea con Atención al Usuario</h2>
            {
                !registrado &&
                <form onSubmit={e => e.preventDefault()}>
                <label form="nombre">Nombre</label>
                <br/>
                <input 
                    type="text" 
                    id="nombreP"
                    value={nombreP}
                    placeholder="Ingrese Nombre" 
                    onChange={(e) => {setnombreP(e.target.value);}}
                />
                <br/><br/>
                <label form="apellido">Apellido</label>
                <input 
                    type="text" 
                    id="apellidoP"
                    value={apellidoP} 
                    placeholder="Ingrese Apellido"
                    onChange={(e) => {setapellidoP(e.target.value);}} 
                />
                <br/><br/>
                <label form="documento">Documento (sin puntos ni guión)</label>
                <input 
                    type="text" 
                    id="documentoP" 
                    value={documentoP}
                    placeholder="Ingrese Documento" 
                    onChange={(e) => {setdocumentoP(e.target.value);}}
                />
                <br/><br/>
                <button className="enviarChat" id="enviar" onClick={handleEnviaralchat}>
                        Entrar al Chat
                </button>
            </form>
            }
            {
               registrado &&
               <Chat nombre={nombreP} />
            }
            
            
        </main>
    )
}
