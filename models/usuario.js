const { Schema, model } = require("mongoose");

const userSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});


//modificamos un metodo con el fin de obtener informacion que necesitamos
userSchema.methods.toJSON = function () {
  // evitando que se retorne un dato en el objeto almacenado en la base de datos
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", userSchema);
