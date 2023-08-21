const express = require('express');
//const verificarToken = require('./../utils/verificarToken');

const router = express.Router();

const paqueteController = require('../controllers/paqueteController');

router.post("/paquete", paqueteController.add);
router.get("/paquete/:usuarioid/list", paqueteController.getByUsuario);
router.get("/paquete/:codigo", paqueteController.getByCodigo);
router.put("/paquete/:id", paqueteController.update);
router.get("/paquete/list/getByEstado", paqueteController.getByEstado);

module.exports = router