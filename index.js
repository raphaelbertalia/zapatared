require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Importa suas rotas (ajuste o caminho se for diferente)
const authRoutes = require('./routes/auth');
const membrosRoutes = require('./routes/membrosRoutes');
const mensalidadesRoutes = require('./routes/mensalidadesRoutes');

// Usa as rotas
app.use('/auth', authRoutes);
app.use('/membros', membrosRoutes);
app.use('/mensalidades', mensalidadesRoutes);

// Rota raiz simples
app.get('/', (req, res) => res.send('API do Motoclube funcionando 🚀'));

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));

module.exports = app;
