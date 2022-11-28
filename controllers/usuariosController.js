const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUser = async (req = request, res = response) => {
  //utilizar parametros por query params   ?hola=nombre&edad=19
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));

  res.json({
    msg: "get API - controller",
    cantidad: usuarios.length,
    usuarios,
  });
};

const postUser = async (req = request, res = response) => {
  //utilizamos los parametros solicitados en formato JSON
  const { nombre, correo, password, role } = req.body;

  const usuario = new Usuario({ nombre, correo, password, role });

  //validacion de la contraseña en el request
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password);
  //guardado de contraseña
  await usuario.save();
  //const body =req.body;
  res.json({
    msg: "post API - controller",
    usuario,
  });
};

const putUser = async (req = request, res = response) => {
  //desestructurando un parametro de la URL en formato STRING
  const { id } = req.params;

  const { _id, password, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "put API - controller",
    usuario,
  });
};

const deleteUser = async(req = request, res = response) => {
  const {id} = req.params;

  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

  res.json({
    msg: "delete API - controller",
    usuario
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser,
};
