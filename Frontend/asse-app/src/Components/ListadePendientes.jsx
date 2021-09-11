import React, {Fragment} from 'react';
import '../Components/ListadePendientes.css';
import { Checkbox } from "../Components/Checkbox";


export default function Listadependientes(props) {
    const repites = props.repitesPen;
    
    if (props.repitesPen.length === 0) { 
       return <div>No hay repites a Mostrar</div>;
    } 
    else {  
        return (
            <ul id="listapen">
                {repites.map(function (unrepite) { 
                return (
                    <Fragment>
                       <li key={unrepite.id}><span>   Cedula:  {unrepite.paciente_cedulap} </span>
                        <span> Medicamento:  {unrepite.nombremed}            </span>  
                        <span>Cantidad:  {unrepite.cantidad}    </span>
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