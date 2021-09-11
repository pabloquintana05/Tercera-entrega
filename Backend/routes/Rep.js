const express = require('express');
const fs = require('fs');
const db = require('../db');

const router = express.Router();

//Ruta para guardar las solicitudes de Repites de Medicacion
router.post('/repites', async (req, res) => {
    console.log('Repites en Backend', JSON.stringify(req.body));
    const cantidadDerepites = req.body.repites.length;
        //Traigo los repites ingresados en el Frontend
    let repites = req.body.repites;
    //Traigo todos los Pacientes de la tabla pacientes
    const pacientes = await db.query('SELECT * FROM paciente');
    //Si no hay pacientes ingresados, ingresa el paciente que viene desde el front
    if (pacientes.rows.length === 0) {
      for (let index = 0; index <= pacientes.rows.length; index++) {
        const idrep = repites[index].id;
        const Medicamento = repites[index].nombreMed;
        console.log(Medicamento);
        const cantidad = repites[index].cantidad;
        const idpac = repites[index].documentoP;
        const nombreP = repites[index].nombreP;
        const apellidoP = repites[index].apellidoP;
        const unpaciente = await db.query('INSERT INTO paciente(cedulap,nombrep,apellidop) VALUES ($1,$2,$3)',[idpac,nombreP,apellidoP]);
        const unrepite = await db.query('INSERT INTO repite(id,nombremed,cantidad,hecho,paciente_cedulap,funcionario_idfunc) VALUES ($1,$2,$3,$4,$5,$6)',[idrep,Medicamento,cantidad,false,idpac,2]);
      }
    }
    else {
      //si hay pacientes en la tabla, hago la query a ver si existe el paciente que viene del front
      for (let i = 0; i < cantidadDerepites; i++){
         const pacienteid = repites[i].documentoP;
         const unpaciente = await db.query('SELECT * FROM paciente WHERE cedulap = $1',[pacienteid]);
         //si no existe el paciente, se ingresa el repite y el paciente 
         if (unpaciente.rows.length === 0){
          const idrep = repites[i].id;
          const Medicamento = repites[i].nombreMed;
          console.log("Carga Pac porque no existe");
          const cantidad = repites[i].cantidad;
          const nombreP = repites[i].nombreP;
          const apellidoP = repites[i].apellidoP;
          const unpaciente = await db.query('INSERT INTO paciente(cedulap,nombrep,apellidop) VALUES ($1,$2,$3)',[pacienteid,nombreP,apellidoP]);
          const unrepite = await db.query('INSERT INTO repite(id,nombremed,cantidad,hecho,paciente_cedulap,funcionario_idfunc) VALUES ($1,$2,$3,$4,$5,$6)',[idrep,Medicamento,cantidad,false,pacienteid,2]);
         }
         //sino ingreso solo el repite
         else { 
          const idrep = repites[i].id;
          const Medicamento = repites[i].nombreMed;
          console.log("No Carga Pac porque existe");
          const cantidad = repites[i].cantidad;
          const unrepite = await db.query('INSERT INTO repite(id,nombremed,cantidad,hecho,paciente_cedulap,funcionario_idfunc) VALUES ($1,$2,$3,$4,$5,$6)',[idrep,Medicamento,cantidad,false,pacienteid,2]);
         }  
      }
    }
    res.send("Actualizado");
});

//Ruta para eliminar las solicitudes de Repites cuando el medico hizo la receta
router.post('/ActRepite', async (req, res) => {
    const cantidadDerepites = req.body.repites.length;
    console.log(cantidadDerepites);
    let repites = req.body.repites;
    //recorro el array de los id de Repites a eliminar
    for (var i = 0; i < repites.length; i++) {
        const idrep = repites[i].id;
        const rephecho = await db.query('UPDATE repite set hecho=$1 WHERE id=$2',[true,idrep]);
    }
    //Actualizo el archivo Repites.json
    
    res.send("Actualizado");

});

router.get('/', (req, res) => {
    res.json({ success: true });
});


//Ruta para enviar las solicitudes de Repite de medicacion pendientes
router.get('/RepitesPen', async (req, res) => {
    //Guardo en la variable datos, todo lo que contiene el JSON
    //const datos = fs.readFileSync('Repites.json', { encoding: 'utf-8' } );
    console.log("Llega al Backend");
    const repites = await db.query('SELECT * from repite WHERE hecho=$1',[false]);
    console.log(repites.rows);
    //Mando el archivo JSON ya convertido (JSON.parse) para que pueda ser leido en el Frontend
    res.json({ error: null, datos: (repites.rows) });
}); 
  
module.exports = router;