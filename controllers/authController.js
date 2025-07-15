const prisma = require('../prisma/client');
const jwt = require('jsonwebtoken');

async function login(req, res) {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario || usuario.senha !== senha) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
}

module.exports = { login };