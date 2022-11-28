const { Router } = require("express");
const { check } = require("express-validator");
const {
  validarCampos,
  validarEmailExiste,
} = require("../middlewares/validar-campos");

const Role = require("../models/role");

const {
  esRoleValidado,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usuariosController");

const router = Router();

router.get("/", getUser);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValidado),
    validarCampos,
  ],
  putUser
);

//al crear una ruta asi podemos decir que los middleware se encuentran activos en esa url
router.post(
  "/",
  [
    check("nombre", "el nombre es un campo obligatorio").not().isEmpty(),
    check("correo", "el correo es un campo obligatorio").not().isEmpty(),
    check("password", "el password debe contener mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "el correo no es valido").isEmail(),
    check("role").custom(esRoleValidado),
    //check("role", 'el rol no existe').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos,
    validarEmailExiste,
  ],
  postUser
);
// router.post("/", postUser);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUser
);

module.exports = router;
