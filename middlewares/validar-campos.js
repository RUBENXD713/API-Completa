const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};


//validacion de la existencia de un correo electronico
const validarEmailExiste = async (req, res, next) => {
  const {correo} = req.body;
  const existeEmail = await Usuario.findOne({correo});
  if (existeEmail) {
    return res.status(400).json({
      msg: `El correo ${correo} pertenece a otro usuario`,
    });
  }
  next();
};

module.exports = {
  validarCampos,
  validarEmailExiste,
};
