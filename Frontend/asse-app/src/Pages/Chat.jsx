import React, { useState, useEffect} from 'react';

import '../Pages/Chat.css';
import Socket from '../Components/Socket';


export default function Chat( {nombre} ) {

const [mensaje, setMensaje] = useState("");
const [mensajes, setMensajes] = useState([]);
  
 useEffect(() => { 
    Socket.emit('conectado', nombre);
        
 },[]);

 useEffect(() => { 
    Socket.on('mensajes', mensaje => { 
            setMensajes([...mensajes,mensaje]);
            setMensaje("");
    })
    return () => {Socket.off('disconect');
    }
}, [mensajes])

const submit = (e) => {
e.preventDefault();
Socket.emit('mensaje', nombre, mensaje)
};
return (
     <main className="contenidoMed" id="chat-div">
              <div className="chat-messages">
                 {mensajes.map((e, i) => <div key={i}>{e.nombre}: &nbsp; {e.mensaje} </div>)}
              </div>
              <div className="chat-form-container">
                 <form id='chat-form' onSubmit={submit}>
                    <input 
                        id="msg"
                        type="text"
                        placeholder="Escriba un Mensaje"
                        required
                        value={mensaje}
                        autocomplete="off"
                        onChange={(e) => {setMensaje(e.target.value);}}
                    />
                   <button className="boton-enviar"><i class="fas fa-paper-plane"></i>ENVIAR</button>
                </form>
                 
            </div>
        </main>
    )
}
