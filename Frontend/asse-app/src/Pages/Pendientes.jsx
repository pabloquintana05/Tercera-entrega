import React, {useEffect, useState} from 'react'
import ListadePendientes from "../Components/ListadePendientes";
import { rephechos } from "../Apis/Repitespendientes";

export default function Pendientes() {
    const [repitespen,setrepitespen] = useState([]);
    const [repitesrealizados, setrepitesrealizados] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:3001/Rep/RepitesPen", {
            method: "GET",
          }).then(function (respuesta) {
            return respuesta.json();
          }).then(function (respuestaJSON) {
              setrepitespen(respuestaJSON.datos)
              
          })
    }, []);

    const toggleRepites = (props) => {
    
        setrepitespen(repitespen.map((unrepite) => { 
            return unrepite.id === props ? {...unrepite, checked: !unrepite.checked } : unrepite;
        }),
        
        ); 
      };
      
      const handleBorrar = () => {
        //filtro todos los repites que estan clickeados con el checkbox y los guardo en un nuevo array    
        const repitesact = repitespen.filter((unrepite) => {
            
                return unrepite.checked === true }); 
                //actualizo la lista de repites
                setrepitesrealizados(repitesact);    
                const repitespendientes = repitespen.filter((repite) => {
                    return repite.checked !== true; });
                    setrepitespen(repitespendientes);
        }
  
      const handleSave = async () => {
           console.log(repitesrealizados);
           const respuesta = await rephechos(repitesrealizados);
            alert(respuesta);
            
       }
    return (
        <main className="contenidoMed">
            <h2>Repetición de Medicación Pendiente</h2>
            <form onSubmit={e => e.preventDefault()}>
                
                <div className="ListaMedicamentos">
                    
                    <ListadePendientes repitesPen={repitespen} toggleRepites={toggleRepites}/>
                    <button className="Enviar" onClick={() => handleBorrar()}>Realizar Repite </button>
                </div>
                <button className="Borrar" onClick={()=>handleSave()}>Borrar Repites Realizados </button>
                
            </form>
            
        </main>
    )
}
