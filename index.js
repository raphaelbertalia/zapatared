require('dotenv').config();

const express = require('express');
const cors = require('cors');

const prisma = require('./prismaClient');

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const membrosRoutes = require('./routes/membrosRoutes');
const mensalidadesRoutes = require('./routes/mensalidadesRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/membros', membrosRoutes);
app.use('/mensalidades', mensalidadesRoutes);
app.use('/produtos', produtoRoutes);

app.get('/', (req, res) => res.send('API do Motoclube funcionando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));

async function testarConexaoBanco() {
  try {
    await prisma.$connect();
    console.log('[DB] Conexão com o banco de dados bem-sucedida');
  } catch (error) {
    console.error('[DB] Falha ao conectar com o banco de dados:', error);
  }
}

testarConexaoBanco();

module.exports = app;
