const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async listarProdutos(req, res) {
    try {
      const produtos = await prisma.produto.findMany({
        include: { variantes: true },
        orderBy: { nome: 'asc' },
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
        include: { variantes: true },
      });
      if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
  },

  async criarProduto(req, res) {
    const { nome, tipo, valorVenda, variantes } = req.body;

    if (!nome || !tipo) {
      return res.status(400).json({ erro: 'Nome e tipo são obrigatórios' });
    }

    const tiposPermitidos = ['CAMISETA_MANGA_CURTA', 'CAMISETA_MANGA_LONGA', 'CAMISETA_REGATA', 'BONE'];

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo de produto inválido' });
    }

    try {
      if (tipo === 'BONE') {
        // Boné: sem variantes, valorVenda é obrigatório
        if (variantes && variantes.length > 0) {
          return res.status(400).json({ erro: 'Boné não deve ter variantes' });
        }
        if (valorVenda == null) {
          return res.status(400).json({ erro: 'Valor de venda é obrigatório para boné' });
        }

        const novoProduto = await prisma.produto.create({
          data: {
            nome,
            tipo,
            valorVenda: new Prisma.Decimal(valorVenda),
          },
        });

        return res.status(201).json(novoProduto);
      }

      // Camisetas: precisam de variantes, e valorVenda (preço final)
      if (!Array.isArray(variantes) || variantes.length === 0) {
        return res.status(400).json({ erro: 'É necessário informar ao menos uma variante' });
      }

      if (valorVenda == null) {
        return res.status(400).json({ erro: 'Valor de venda obrigatório para o produto' });
      }

      const variantesFormatadas = variantes.map((v) => {
        if (!v.tamanho) {
          throw new Error('Todas as variantes devem ter tamanho definido');
        }
        return {
          tamanho: v.tamanho,
          subtipo: v.subtipo ?? null,
        };
      });

      const novoProduto = await prisma.produto.create({
        data: {
          nome,
          tipo,
          valorVenda: new Prisma.Decimal(valorVenda),
          variantes: {
            create: variantesFormatadas,
          },
        },
        include: {
          variantes: true,
        },
      });

      return res.status(201).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ erro: 'Erro ao criar produto' });
    }
  },

  async atualizarProduto(req, res) {
    res.status(501).json({ mensagem: 'Atualização de produto não implementada' });
  },

  async deletarProduto(req, res) {
    res.status(501).json({ mensagem: 'Exclusão de produto não implementada' });
  },
};
