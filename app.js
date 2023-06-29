const express = require("express");

const app = require('express')();
const http = require('http').Server(app);
const path = require('path')

//models 
const entityConfig = require('./models/EntityConfigModel')
const entity = require('./models/EntityModel');
const role = require('./models/RolesModel')
const user = require('./models/UsersModel')
const valorPLC = require('./models/ValorPLCModel')
const valariables = require('./models/VariablesModel')

//Sequelize 
const sequelize = require('./db/connection')

//Enviroments
const dotenv = require('dotenv');
dotenv.config();

//CORS DE LA APP
const cors = require("cors");
app.use(express.urlencoded({extended: false}));
app.use(express.json ());
app.use(cors());

/* var assetsPath = path.join(__dirname, '/public');
app.use(express.static(assetsPath));

console.log(assetsPath); */
//RUTAS 


app.use('/images', express.static('public/users'))
/* app.use('ruta') */
const entityRouter = require('./routes/entityRoute'); 
const entityConfigRouter = require('./routes/entityConfig');
const usersRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/rolesRoutes')
const variable = require('./routes/variablesRoutes');
const login = require('./routes/authRoute');
app.use("/api/entity",entityRouter);
app.use("/api/entityConfig",entityConfigRouter);
app.use("/api/users",usersRouter,express.static('public/users'))
app.use("/api/rol",roleRouter)
app.use("/api/variable",variable)
app.use("/api/auth",login)

const { io } = require("socket.io-client");
const socket = io("http://localhost:8080");

const ioSocket = require('socket.io')(http, {
  cors: {
      origins: ['http://localhost:4200']
  }
})
// client-side
socket.on("connect", () => {
  console.log('conectado a mi socket SERVICE');
});

ioSocket.on('connection',(socketData)=> {  
  console.log('conectado a socket');

  socket.on("push",(data)=> {
    console.log(data);
    socketData.emit('envio',data)
  }
  );

}) 

socket.on("disconnect", (socket) => {
});


//Conexion de la bbdd 
async function dbConnect(){
    try {
    await sequelize.sync({force: false});
    console.log('Conexion a la base de datos')
    http.listen(process.env.PORT);
    console.log('Server running:', process.env.PORT);
     // await Elemento.sync({force:false}); 
     // await Variable.sync({force:false});
     // await User.sync({force:false});
     // await ValorOpcua.sync({force:false});
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  
dbConnect();