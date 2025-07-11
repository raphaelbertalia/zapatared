const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API do Motoclube funcionando 🚀'));

// Criar membro
app.post('/membros', async (req, res) => {
  const {apelido, nome, telefone, email } = req.body;
  const novoMembro = await prisma.membro.create({
    data: {apelido,  nome, telefone, email }
  });
  res.json(novoMembro);
});

// Listar membros com mensalidades
app.get('/membros', async (req, res) => {
  const membros = await prisma.membro.findMany({
    include: { mensalidades: true }
  });
  res.json(membros);
});

// Criar mensalidade
app.post('/mensalidades', async (req, res) => {
  const { mes, valor, membroId } = req.body;

  try {
    const novaMensalidade = await prisma.mensalidade.create({
      data: {
        mes,
        valor: Number(valor),
        pago: false,
        membroId: Number(membroId),
      },
    });

    res.status(201).json(novaMensalidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao cadastrar mensalidade' });
  }
});

// Marcar mensalidade como paga
app.put('/mensalidades/:id/pagar', async (req, res) => {
  const id = parseInt(req.params.id);
  const atualizada = await prisma.mensalidade.update({
    where: { id },
    data: { pago: true }
  });
  res.json(atualizada);
});

app.delete('/mensalidades/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.mensalidade.delete({
      where: { id: Number(id) },
    });

    res.status(204).send(); // Sem conteúdo
  } catch (err) {
    console.error('Erro ao excluir mensalidade:', err);
    res.status(500).json({ erro: 'Erro ao excluir mensalidade' });
  }
});

app.delete('/membros/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.membro.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao excluir membro' });
  }
});

app.put('/membros/:id', async (req, res) => {
  const { id } = req.params;
  const { apelido, nome, telefone, email } = req.body;

  try {
    const membroAtualizado = await prisma.membro.update({
      where: { id: Number(id) },
      data: { apelido, nome, telefone, email },
    });
    res.json(membroAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar membro' });
  }
});

app.patch('/mensalidades/:id/pago', async (req, res) => {
  const { id } = req.params;
  const { pago } = req.body;

  try {
    const mensalidadeAtualizada = await prisma.mensalidade.update({
      where: { id: Number(id) },
      data: { pago: Boolean(pago) },
    });

    res.json(mensalidadeAtualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar status da mensalidade' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});