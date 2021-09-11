import React from 'react';
import { Link } from 'react-router-dom';
import '../Components/Nav.css';


export default function Nav() {
    return (
        <nav className="Menu">
            <ul className="lista">
                <li><Link className="link" to="/">Inicio</Link></li>
                <li><Link className="link" to="/SolicitudVideo">Solicitar Videollamada con Médico</Link></li>
                <li><Link className="link" to="/Medicamentos">Solicitar Repetición de Medicación</Link></li>
                <li><Link className="link" to="/LoginF">Area Funcionarios</Link></li>
            </ul>
        </nav>
    )
}

//Hacer menu para Navegacion
//react-router-dom va aca para usar las rutas, va en app.js
//href van las rutas por ejemplo /videollamada
