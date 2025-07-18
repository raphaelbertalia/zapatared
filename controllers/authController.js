const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // instale com: npm install bcryptjs

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    console.warn('[LOGIN] Email ou senha ausentes');
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    console.log(`[LOGIN] Tentando login com email: ${email}`);

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      console.warn(`[LOGIN] Usuário não encontrado: ${email}`);
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.warn(`[LOGIN] Senha inválida para: ${email}`);
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`[LOGIN] Login bem-sucedido: ${email}`);
    return res.json({ token, nome: usuario.nome });

  } catch (err) {
    console.error('[LOGIN] Erro inesperado no login:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

module.exports = { login };
