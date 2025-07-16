const express = require('express');
const router = express.Router();
const { criarUsuario } = require('../controllers/usuarioController');

router.post('/register', criarUsuario);

module.exports = router;