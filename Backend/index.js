const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
require('dotenv').config();
//const socketio = require('socket.io');
const bodyParser = require('body-parser');
//Llamo al js messages para darle formato al chat
const formatMessage = require('./middlewares/messages');
const users={};

const app = express();
const port = 3001;
//Creo el servidor http
const server = http.createServer(app);

const io = require('socket.io')(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

const repRouter = require('./routes/Rep');
const authRouter = require('./routes/auth');
const videoRouter = require('./routes/video');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

//uso la ruta de repites

app.use('/Rep', repRouter);

//uso la ruta de autorizacion para logueo

app.use('/auth', authRouter);

//uso la ruta para las solicitudes de video Consultas

app.use('/video', videoRouter);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'public/index.html'));
});

// le digo a express que todos los archivos estan en public
app.use(express.static(path.join(__dirname,'public')));

const botName = 'Hospital de Colonia  ';

//corre cuando un cliente se conecta
io.on('connection', socket => {
    
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
    socket.emit("me", socket.id)
        
    
    
    
    socket.on('conectado', (usuario) => {
    
     nombre=usuario,
     socket.broadcast.emit('mensajes', {
        nombre: nombre,
        mensaje: `${nombre} ha entrado en la sala del chat`,
      });
    
    });
      console.log(`Connected: ${socket.id}`);
      socket.on('disconnect', () =>
         console.log(`Disconnected: ${socket.id}`)
         //socket.broadcast.emit('mensaje', {
         //    mensaje: `${socket.id} se ha desconectado`,
         );
         


    socket.on('mensaje', (nombre, mensaje) => {
        io.emit("mensajes", {nombre, mensaje, mensaje});
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", {signal:data.signalData, from: data.from, name: data.name})

    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted" ,data.signal)
    }) 
        

    //Escuchar el chatMessage
   // socket.on('chatMessage', (msg, userid) => {
        //lo envio al cliente
       // io.emit('message', formatMessage(userid, msg));
   // });
});

server.listen(port, function(){
    console.log(`Servidor esta escuchando en el puerto:${port}`)
});