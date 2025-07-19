const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async listar(req, res) {
    try {
      const fornecedores = await prisma.fornecedor.findMany({
        orderBy: { nome: 'asc' },
      });
      res.json(fornecedores);
    } catch (error) {
      console.error('Erro ao listar fornecedores:', error);
      res.status(500).json({ error: 'Erro ao listar fornecedores' });
    }
  },

  async criar(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome do fornecedor é obrigatório' });
    }

    try {
      const novoFornecedor = await prisma.fornecedor.create({
        data: { nome },
      });
      res.status(201).json(novoFornecedor);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao criar fornecedor' });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const fornecedorAtualizado = await prisma.fornecedor.update({
        where: { id: parseInt(id) },
        data: { nome },
      });
      res.json(fornecedorAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await prisma.fornecedor.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send(); // sucesso sem conteúdo
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
  }
};
