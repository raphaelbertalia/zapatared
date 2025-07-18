const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async listarProdutos(req, res) {
    try {
      const produtos = await prisma.produto.findMany({
        include: { variantes: true },
        orderBy: { nome: 'asc' }
      });
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ erro: 'Erro ao listar produtos' });
    }
  },

  async buscarProdutoPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await prisma.produto.findUnique({
        where: { id },
        include: { variantes: true }
      });
      if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
  },

  async criarProduto(req, res) {
    const { nome, tipo, tamanho, custo, valorVenda, variantes } = req.body;
    try {
      if (tipo === 'BONE') {
        const novoProduto = await prisma.produto.create({
          data: {
            nome,
            tipo,
            tamanho,
            custo,
            valorVenda,
          },
        });
        return res.status(201).json(novoProduto);
      }

      if (
        tipo === 'CAMISETA_MANGA_CURTA' ||
        tipo === 'CAMISETA_MANGA_LONGA' ||
        tipo === 'CAMISETA_REGATA'
      ) {
        const novoProduto = await prisma.produto.create({
          data: {
            nome,
            tipo,
            variantes: {
              create: variantes.map(v => ({
                tamanho: v.tamanho,
                precoFornecedor: v.precoFornecedor,
                precoVenda: v.precoVenda,
                subtipo: v.subtipo,
              })),
            },
          },
          include: {
            variantes: true,
          },
        });
        return res.status(201).json(novoProduto);
      }

      return res.status(400).json({ erro: 'Tipo de produto inválido' });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ erro: 'Erro ao criar produto' });
    }
  },

  async atualizarProduto(req, res) {
    // Implemente sua lógica de atualização aqui
    res.status(501).json({ mensagem: 'Atualização de produto não implementada' });
  },

  async deletarProduto(req, res) {
    // Implemente sua lógica de exclusão aqui
    res.status(501).json({ mensagem: 'Exclusão de produto não implementada' });
  },
};
