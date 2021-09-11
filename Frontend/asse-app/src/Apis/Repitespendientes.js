const rephechos = function (reprealizados){
  console.log('Repites en Frontend', reprealizados);
  return fetch('http://localhost:3001/Rep/ActRepite', {
                          
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //Con el metodo post, le paso el arreglo de Repites
      body: JSON.stringify({ repites: reprealizados })
    }).then (function(resultado) {
      if (resultado.ok === true) {
        return ("Se realizo el Repite Correctamente") 
      }  
      })
      
      
    
  }

export {
    rephechos
};