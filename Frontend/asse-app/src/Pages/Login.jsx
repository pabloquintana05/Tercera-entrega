import React,{useState, Fragment} from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
const [name,setname] = useState("");
const [password,setpassword] = useState("");
const history = useHistory();

const handlenamechange = (e) => { 
    setname(e.target.value);
}

const handlePasschange = (e) => { 
    setpassword(e.target.value);
}

const handleLogin = () => { 
    if (name.length===0){
        alert("Debe completar el usuario")
        return;
    }
    if (password.length===0){
        alert("Debe completar el password")
        return;
    }

    fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, password: password}),
    }).then(res => { 
        return res.json();
    }).then((respuesta) => { 
        if (respuesta.error) { 
            alert("error");
            console.log(respuesta.error)
        } else { 
            
            if (name === "Emergencia"){
                history.push("/SolicitudVideo");
            }else if (name === "Policlinica"){
                history.push("/Pendientes");
            }else if (name === "AtencionalUsuario"){
                history.push("/Chat");
            }
        } 


    }); 
}
return (
        <Fragment>
          <main className="contenidoFuncionarios">
            <h2>Ingreso de Funcionarios</h2>
            <form onSubmit={e => e.preventDefault()}>
                <div className="DatosPacientes" id="DatosLogin">
                    <label form="nombre">Usuario  </label>
                
                    <input type="text" 
                    id="UsuarioF"
                    placeholder="Ingrese su usuario"
                    onChange={handlenamechange}
                    />
                    
                    <label form="contrasena">Contraseña </label>
                    <input type="password" 
                    id="passwordF"
                    placeholder="Ingrese su contrasena"
                    onChange={handlePasschange} 
                    />
                    
                </div>
                <button className="login" onClick={handleLogin}>Ingresar</button>
            </form>
        </main>
       </Fragment>
    )
}
