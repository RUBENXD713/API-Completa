const mongoose = require('mongoose');
require('colors');


const dbConnection =async ()=> {
    //console.log(process.env.MONGODB_CNN.cyan);

    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("base de datos en linea".cyan);
    } catch (error) {
        console.log(error);
        throw new Error('error en la conexion de la Base de datos'.red);
    }
}


module.exports = {
    dbConnection
}