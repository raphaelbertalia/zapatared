const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function calcularVencimento(mesString) {
  const [mes, ano] = mesString.split('/').map(Number);
  return new Date(ano, mes, 0); // último dia do mês
}

module.exports = {
  
  async listarMensalidades(req, res) {
    try {
      const mensalidades = await prisma.mensalidade.findMany({
        include: { membro: true },
        orderBy: { mes: 'desc' },
      });
      res.json(mensalidades);
    } catch (error) {
      console.error('Erro ao listar mensalidades:', error);
      res.status(500).json({ erro: 'Erro ao listar mensalidades' });
    }
  },

  async criarMensalidade(req, res) {
  const { mes, valor, membroId } = req.body;

  if (!/^((0[1-9])|(1[0-2]))\/\d{4}$/.test(mes)) {
    return res.status(400).json({ erro: 'Formato de mês inválido (use MM/YYYY)' });
  }

  const vencimento = calcularVencimento(mes);   // ← sem “this.”

  try {
    const novaMensalidade = await prisma.mensalidade.create({
      data: {
        mes,
        valor: Number(valor),
        pago: false,
        membroId: Number(membroId),
        vencimento,
      },
    });
    return res.status(201).json(novaMensalidade);
  } catch (error) {
    console.error('Erro ao cadastrar mensalidade:', error);
    return res.status(500).json({ erro: 'Erro ao cadastrar mensalidade' });
  }
},

  async marcarComoPago(req, res) {
    const { id } = req.params;
    const { pago } = req.body;

    try {
      const atualizada = await prisma.mensalidade.update({
        where: { id: Number(id) },
        data: { pago: Boolean(pago) },
      });
      res.json(atualizada);
    } catch (error) {
      console.error('Erro ao atualizar status da mensalidade:', error);
      res.status(500).json({ erro: 'Erro ao atualizar status da mensalidade' });
    }
  },

  async marcarComoPagoPut(req, res) {
    const id = parseInt(req.params.id);

    try {
      const atualizada = await prisma.mensalidade.update({
        where: { id },
        data: { pago: true },
      });
      res.json(atualizada);
    } catch (error) {
      console.error('Erro ao marcar como pago:', error);
      res.status(500).json({ erro: 'Erro ao marcar como pago' });
    }
  },

  async deletarMensalidade(req, res) {
    const { id } = req.params;

    try {
      await prisma.mensalidade.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (err) {
      console.error('Erro ao excluir mensalidade:', err);
      res.status(500).json({ erro: 'Erro ao excluir mensalidade' });
    }
  },
  
};
