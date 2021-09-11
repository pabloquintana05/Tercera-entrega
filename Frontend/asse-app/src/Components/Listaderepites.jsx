import React, {Fragment} from 'react';
import '../Components/Listaderepites.css';
import { Checkbox } from "../Components/Checkbox";


export default function Listaderepites(props) {
    const repites = props.repites;
    
    //const handleCheckboxChange = (id, checked) => {
    //    console.log(`Soy el checkbox ${id} y mi estado de check es ${checked}`);
    //    props.toggleRepites(id, checked);
        
    //};
    if (props.repites.length === 0) { 
       return <div>No hay repites a Mostrar</div>;
    } 
    else if (props.repites.nombreMed === ""){
        return <div>No hay repites a Mostrar</div>
    }    
    else {  
        return (
            <ul id="listamed">
                {repites.map(function (unrepite) { 
                return (
                    <Fragment>
                       <li key={unrepite.id}><span>Medicacion: {unrepite.nombreMed}</span>
                       <span>Cantidad:  {unrepite.cantidad}</span>
                       <Checkbox
                          id={unrepite.id}
                          onChange={() => props.toggleRepites(`${unrepite.id}`)}
                        />
                      </li>
                    </Fragment>
                );
                
                })}                
            </ul>
        );
    }    
}
   

//cambiar el estado del repite dependiendo si esta clickeado el checkbox o no