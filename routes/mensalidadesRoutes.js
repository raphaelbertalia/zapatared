const express = require('express');
const router = express.Router();
const controller = require('../controllers/mensalidadeController');
const autenticarToken = require('../middlewares/authMiddleware');

router.get('/', autenticarToken, controller.listarMensalidades);
router.post('/', autenticarToken, controller.criarMensalidade);
router.patch('/:id/pago', autenticarToken, controller.marcarComoPago);
router.patch('/:id/pago', autenticarToken, controller.marcarComoPagoPut);
router.delete('/:id', autenticarToken, controller.deletarMensalidade);

module.exports = router;
