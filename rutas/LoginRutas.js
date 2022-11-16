const LoginOperaciones = require("../operaciones/LoginOperaciones");
const router = require('express').Router();

router.post("/", LoginOperaciones.Login);

module.exports = router