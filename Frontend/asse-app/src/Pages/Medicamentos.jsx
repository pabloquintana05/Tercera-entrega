import React, {useState}  from 'react';
import Listaderepites from "../Components/Listaderepites";
import { saverepites } from "../Apis/Guardarrepites";


export default function Medicamentos() {
  //Defino las variables de estado del formulario y el array de repites  
  const [nombreP, setnombreP] = useState("");  
  const [apellidoP, setapellidoP] = useState("");
  const [documentoP, setdocumentoP] = useState("");
  const [nombreMed, setnombreMed] = useState("");
  const [cantidad, setcantidad] = useState(""); 
  const [listarep, setlistarep] = useState([]); 
  
  
 
  const handleCargarMedicacion = () => {
    //Se carga el objeto repite en el arreglo de repites cuando se da clic en el boton Cargar en Formulario   
    const id = new Date().getTime().toString();
    const newRepite = {
        id: id,
        nombreP,
        apellidoP, 
        documentoP, 
        nombreMed, 
        cantidad,
        checked: false
    }
    // Se carga el nuevo repite en el array de Lista de Repites
    setlistarep([...listarep, newRepite]);
    //se inicializan los input de medicacion
    setnombreMed("");
    setcantidad("");
  };  
  //traigo el id chequeado
  const toggleRepites = (props) => {
    
    setlistarep(listarep.map((unrepite) => { 
        return unrepite.id === props ? {...unrepite, checked: !unrepite.checked } : unrepite;
    }),
    
    ); 
    console.log(listarep);
  };

    const handleBorrar = () => {
    //filtro todos los repites que no estan clickeados con el checkbox y los guardo en un nuevo array    
    const repitesact = listarep.filter((unrepite) => {
        return unrepite.checked !== true }); 
        //actualizo la lista de repites
        setlistarep(repitesact);   
    }

    const handleSave = async () => {
        //mando al Backend el array con la lista de repites  
        const respuesta = await saverepites(listarep);
        alert (respuesta);
        //inicializo los input
        setnombreP("");
        setapellidoP("");
        setdocumentoP("");
        setlistarep([]);
        
    }
    return (
        <main className="contenidoMed">
            <h2>Solicitud de Repetición de Medicación</h2>
            <form onSubmit={e => e.preventDefault()}>
                <p>Datos del Paciente</p>
                <div className="DatosPacientes">
                    <label form="nombre">Nombre  </label>
                    <input 
                       type="text" 
                       id="nombrePac"
                       value={nombreP}
                       placeholder="Ingrese Nombre" 
                       onChange={(e) => {setnombreP(e.target.value);}}
                    />
                    <label form="apellido"> Apellido  </label>
                    <input 
                       type="text" 
                       id="apellidoP"
                       value={apellidoP} 
                       placeholder="Ingrese Apellido"
                       onChange={(e) => {setapellidoP(e.target.value);}} 
                    />
                    <label form="documento"> Cedula (sin puntos ni guión) </label>
                    <input 
                       type="text" 
                       id="documentoP" 
                       value={documentoP}
                       placeholder="Ingrese Documento" 
                       onChange={(e) => {setdocumentoP(e.target.value);}}
                    />
                    <br/><br/>
                </div>
                <p>Ingreso de la Medicación</p>
                <div className="Medicamento">
                    <label form="medicamento">Nombre Medicamento </label>
                    <input 
                       type="text" 
                       id="nombre-Med" 
                       placeholder="Ingrese Nombre Medicación"
                       value={nombreMed} 
                       onChange={(e) => {setnombreMed(e.target.value);}}
                    />
                    <label form="cantidad"> Cantidad que toma por día </label>
                    <input 
                       type="number" 
                       id="cantidad-Med" 
                       maxLength="3"
                       value={cantidad}
                       
                       onChange={(e) => {setcantidad(e.target.value);}}
                    />
                    <label form="forma">(comp/susp(ml))</label>
                    <br/><br/>
                    <button className="cargarMed" id="cargar" onClick={() => handleCargarMedicacion()}>
                        Cargar en Formulario
                    </button>
                </div>
                
                <p id="Solicitudrepite">Formulario de solicitud de Repite</p>
                <div className="ListaMedicamentos">
                    
                    <Listaderepites repites={listarep} toggleRepites={toggleRepites}/>
                    <button className="Borrar" onClick={()=>handleBorrar()}>Borrar un Medicamento </button>
                </div>
                
                <button className="Enviar" onClick={() => handleSave()}>Enviar Solicitud </button>
            </form>
            
        </main>
    )
}

