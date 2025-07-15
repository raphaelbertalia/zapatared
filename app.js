const express = require('express');
const cors = require('cors');

const membroRoutes = require('./routes/membroRoutes');
const mensalidadeRoutes = require('./routes/mensalidadeRoutes');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API do Motoclube funcionando 🚀'));

app.use('/auth', authRoutes);
app.use('/membros', membroRoutes);
app.use('/mensalidades', mensalidadeRoutes);

module.exports = app;
