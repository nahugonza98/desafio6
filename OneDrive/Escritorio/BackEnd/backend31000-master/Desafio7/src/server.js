/////DECLARACIONES
const express = require('express');
const app = express();
const puerto = 8080;
const path = require('path');
const expressServer = app.listen(puerto, () => {
    try{
        console.log(`El servidor está escuchando el puerto: ${puerto}`)
    }
    catch(error){
        console.log("Ocurrió el siguiente error al iniciar: ", error);
    }
});
//io server
const { Server: IOServer } = require('socket.io');
const io = new IOServer(expressServer);
//array
const msgArray = [];
const productos = [
{
    id: 1,
    url: "https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/128/Home-icon.png",
    price: 1000,
    description: "casa3",
},
{
    id: 2,
    url: "https://cdn0.iconfinder.com/data/icons/social-and-ui/50/2-128.png",
    price: 2200,
    description: "casa2",
},
{
    id: 3,
    url: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-6/177800/292-128.png",
    price: 3000,
    description: "casa4",
},
];
//contenedor de archivo
const Contenedor = require('./contenedor.js');
dbChats = new Contenedor;
//--------------------------------------------//

/////APLICACION

//conf para acceder al body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas estáticas - public
app.use(express.static(path.join(__dirname, '../public')));

//io sockets
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id);
    //productos
    socket.emit('server:products', productos);
    socket.on('client:product', productoInfo => {
        productos.push(productoInfo);
        io.emit('server:products', productos);
    })
    //mensajes
    socket.emit('server:msgs', msgArray);
    socket.on('client:msg', msgInfo => {
        msgArray.push(msgInfo);
        dbChats.save(msgInfo);
        io.emit('server:msgs', msgArray)
    })
})


