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
const historical = require('./models/HistoricalModel')
const serverConnection = require('./models/ServerConnectionModel');

const {getAllServerConn} = require('./controllers/serverConnController');

//Sequelize 
const sequelize = require('./db/connection')

//Enviroments
const dotenv = require('dotenv');
dotenv.config();

//CORS DE LA APP
const cors = require("cors");
app.use(express.urlencoded({extended: true}));
app.use(express.json ());
app.use(cors());

/* var assetsPath = path.join(__dirname, '/public');
app.use(express.static(assetsPath));

console.log(assetsPath); */
//RUTAS 


app.use('/images', express.static('public/users'))
app.use('/imagesEntity', express.static('public/entity'))
/* app.use('ruta') */
const entityRouter = require('./routes/entityRoute'); 
const entityConfigRouter = require('./routes/entityConfig');
const historicalRouter = require('./routes/historicalRoutes')
const usersRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/rolesRoutes')
const variable = require('./routes/variablesRoutes');
const login = require('./routes/authRoute');
const serverConnectionRouter = require('./routes/serverConnRoute')
app.use("/api/entity",entityRouter);
app.use("/api/entityConfig",entityConfigRouter);
app.use("/api/historical",historicalRouter);
app.use("/api/users",usersRouter,express.static('public/users'))
app.use("/api/rol",roleRouter)
app.use("/api/variable",variable)
app.use("/api/auth",login)
app.use("/api/serverConn",serverConnectionRouter )



async function main() {
  try {
      // Llama a la función y espera a que se resuelva la promesa
      const result = await getAllServerConn();

      return result
      // Hacer lo que quieras con el resultado, como imprimirlo en la consola
  } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la ejecución de la función
      console.error(error);
  }
}

const { io } = require("socket.io-client");
const variables = require("./models/VariablesModel");
//const socket = io("http://192.168.200.23:8082");  //NodejOpcua
const socket = io("http://localhost:8082");  //NodejOpcua


const ioSocket = require('socket.io')(http, {
  cors: {
      //origins: ['http://192.168.200.23:8085'] //Front
      origins: ['http://localhost:4200'] //Front

  }
})
// client-side
socket.on("connect", () => {
  console.log('conectado a mi socket SERVICE');
});


let plcValues 
main()
    .then(socketTags => {
        // Iterar sobre los objetos dentro de la promesa
        socketTags.forEach(server => {
            ioSocket.on('connection', (socketData) => {
                console.log('conectado a socket');
                socket.on(server.socketTag, (data) => {
                  //console.log(data.data);
                   plcValues = 
                  socketData.emit('envio',data)
                   return plcValues = data.data
                });
            });
        });
    })
    .catch(error => {
        // Maneja cualquier error que ocurra durante la ejecución de la función main
        console.error('Ocurrió un error:', error);
    });

socket.on("disconnect", (socket) => {
  console.log('socket disconnect',socket)
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
       //await historical.sync({force:false});
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  
dbConnect();

 async function getVaraiblesSelectedTrue(){
  try {
    const array = []
    const variablesSelected = await variables.findAll({
      order: [["id", "ASC"]],
      where:{selected:true},
  })
  if ( variablesSelected.length > 0){

    variablesSelected.forEach(element => {
      array.push(element.dataValues)
    }); 
    plcValues.forEach(plcValue => {
      array.forEach(variable => {
        if( variable.id === plcValue.id){
          const date = new Date()
          variable.plcValue = plcValue.plcValues
            variable.date = date
        }      
      })
    })
    const nuevoArray = array.map(({ id,des_variable, desc_entity,unidad, plcValue, date }) => ({
      desc_variable:des_variable,
      desc_entity:desc_entity,
      unidad,
      plcValue,
      date,
      id_variable:id
    }));


    const create = await historical.bulkCreate(nuevoArray)

  }else {
    return
  }
  } catch (error) {
      console.log(error);
  }
}

setInterval(async () =>{
  getVaraiblesSelectedTrue()
},20000) 




/* ioSocket.on('connection',(socketData)=> {  
  console.log('conectado a socket');

  console.log(socketTags);
  socket.on("push1",(data)=> {
    plcValues = 
    socketData.emit('envio',data)
    return plcValues = data.data
  }
  );
})  */