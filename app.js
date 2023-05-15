const express = require("express");
const app = express();

//models 
const entityConfig = require('./models/EntityConfigModel')
const entity = require('./models/EntityModel');
const role = require('./models/RolesModel')
const user = require('./models/UsersModel')
const valorPLC = require('./models/VariablesPLCModel')
const valariables = require('./models/VariablesModel')

//Sequelize 
const sequelize = require('./db/connection')

//Enviroments
const dotenv = require('dotenv');
dotenv.config();

//CORS DE LA APP
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:4200"
  };
app.use(cors(corsOptions));

// PARSEO DE JSON 
app.use(express.urlencoded({extended: false}));
app.use(express.json ());


//RUTAS 

/* app.use('ruta') */
const entityRouter = require('./routes/entityRoute'); 
const entityConfigRouter = require('./routes/entityConfig');
const usersRouter = require('./routes/userRoutes');
const roleRouter = require('./routes/rolesRoutes')

app.use("/api/entity",entityRouter);
app.use("/api/entityConfig",entityConfigRouter);
app.use("/api/users",usersRouter)
app.use("/api/rol",roleRouter)
//Socket.io




//Conexion de la bbdd 
async function dbConnect(){
    try {
    await sequelize.sync({force: false});
    console.log('Conexion a la base de datos')
    app.listen(process.env.PORT);
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