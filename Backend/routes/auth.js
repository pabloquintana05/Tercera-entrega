const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const { TOKEN_SECRET, verifyToken } = require('../middlewares/jwt-validate');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ success: true });
});

//Ruta para los Usuarios que se loguean, para comprobar si existe
router.post('/login', async(req, res) => {

    
let userResult = await db.query('SELECT idfunc, name, password from funcionario WHERE name=$1',[req.body.name]);

if (userResult.rows.length === 0) {
  return res.status(400).json({ error: 'Usuario no encontrado'});
}

const user = userResult.rows[0];
   
    //comparo el password encryptado
const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (!validPassword) {
      console.log("Pass Invalido");
       return res.status(400).json({ error: 'Contraseña no válida' });
    }
    // Crear el token
  const token = jwt.sign({
    id: user.id,
    name: user.name,
    mail: user.password,
  }, TOKEN_SECRET);

    res.status(200).json({ error: null, data: 'Login exitoso'});
});

//Ruta para devolver los datos de un usuario 
router.get('/usuarios', verifyToken, (req, res) => {
  
  // Podemos acceder a los datos del usuario que hizo la request
  // Segun el JWT que envio en los headers de la request
  res.json({ error: null, usuarios });
});

module.exports = router;


//const usuarios = [
//  {
    //pass 1234
 //   name: 'Emergencia',
//    password: '$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a'
 // },
 // {
    //pass 1234
   // name: 'Policlinica',
   // password: '$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a'
//  },
 // {
    //pass 1234
  //  name: 'AtencionalUsuario',
  //  password: '$2b$10$miZNFo80WAAXl17Wy3YqduVVzFchtrkX5muO2OBHyHQ3qn.48b5/a'
//  }
//];