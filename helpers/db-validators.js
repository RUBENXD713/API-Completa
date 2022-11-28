const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValidado = async (role = "") => {
  //buscando roles y validando en la base de datos
  const existeRol = await Role.findOne({ role });

  if (!existeRol) {
    throw new Error(`EL rol ${role} no existe en la base de datos`);
  }
};

//existe usuario
const existeUsuarioPorId = async(id) => {
  const existeUsuario = await Usuario.findById(id);
  if(!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esRoleValidado,
  existeUsuarioPorId
};
