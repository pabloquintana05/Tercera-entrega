//traigo el array de repites y lo mando al backend
const saverepites = function (repites){
console.log('Repites en Frontend', repites);
return fetch('http://localhost:3001/Rep/repites', {
                        
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    //Con el metodo post, le paso el arreglo de Repites
    body: JSON.stringify({ repites: repites })
  }).then (function(resultado) {
    if (resultado.ok === true) {
      return ("Se agrego el Repite Correctamente") 
    }  
    })
    
    
  
}

export {
    saverepites
};    