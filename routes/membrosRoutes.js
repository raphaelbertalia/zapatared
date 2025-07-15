// routes/membrosRoutes.js
const express = require('express');
const router = express.Router();

const {
  obter,
  listar,
  criar,
  atualizar,
  deletar,
  validarMembro,     // ← middleware de validação
} = require('../controllers/membroController');

const autenticarToken = require('../middlewares/authMiddleware');

router.get('/:id', autenticarToken, obter);

// ---------- rotas ----------
router.get('/', autenticarToken, listar);

router.post(
  '/',
  autenticarToken,
  validarMembro,   // valida campos antes de chegar no controller
  criar
);

router.put(
  '/:id',
  autenticarToken,
  validarMembro,   // idem na atualização
  atualizar
);

router.delete('/:id', autenticarToken, deletar);

module.exports = router;
