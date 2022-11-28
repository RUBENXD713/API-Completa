const express = require("express");
const cors = require("cors");

const {dbConnection} = require("../database/config")

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/usuarios";
    //conexion base de datos

    this.conectarDB();

    //middlewares
    this.middlewares();

    //end middlewares
    //Rutas de mi APP
    this.routes();
    //end Rutas de mi APP

    
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares() {
    //cors utilizado para realizar peticiones por medio de otras aplicaciones como axios
    this.app.use(cors());
    //lectura del request y parseo a JSON
    this.app.use(express.json());
    //directorio pubico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosRoutePath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port:" + this.port);
    });
  }
}

module.exports = Server;
