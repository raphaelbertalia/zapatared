const prisma = require('../prisma/client');

/**
 * Converte qualquer entrada do front‑end para o enum do Prisma.
 */
const mapGraduacao = {
  CAMISETA: 'CAMISETA',
  PROSPERO: 'PROSPERO',
  'PRÓSPERO': 'PROSPERO',
  MEIO_ESCUDO: 'MEIO_ESCUDO',
  MEIOESCUDO: 'MEIO_ESCUDO',
  OFICIAL: 'OFICIAL',
  HONRADO: 'HONRADO',
  VETERANO: 'VETERANO',
};

const obter = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  try {
    const membro = await prisma.membro.findUnique({
      where: { id },
      include: { mensalidades: true }, // traga as mensalidades, se desejar
    });

    if (!membro) {
      return res.status(404).json({ erro: 'Membro não encontrado' });
    }

    res.json(membro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar membro por ID' });
  }
};

/** Normaliza string: tira acento, deixa MAIÚSCULA e troca espaço por _ */
function normalizaGraduacao(input) {
  if (!input) return null;
  return input
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, '_');
}

// ───────────────────────────────────────────────
// Middleware de validação
function validarMembro(req, res, next) {
  const { apelido, nome, graduacao, funcao } = req.body;

  if (!apelido || !nome) {
    return res.status(400).json({ erro: 'Nome e apelido são obrigatórios' });
  }

  const chave = normalizaGraduacao(graduacao);
  const graduacaoEnum = mapGraduacao[chave];

  if (!graduacaoEnum) {
    return res.status(400).json({ erro: 'Graduação inválida' });
  }

  // já deixa no formato exato do Prisma
  req.body.graduacao = graduacaoEnum;
  req.body.funcao = funcao?.trim() || null;

  next();
}
// ───────────────────────────────────────────────

const listar = async (_req, res) => {
  try {
    const membros = await prisma.membro.findMany({ include: { mensalidades: true } });
    res.json(membros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar membros' });
  }
};

const criar = async (req, res) => {
  const { apelido, nome, cpf, telefone, email, status, graduacao, funcao } = req.body;

  try {
    const novoMembro = await prisma.membro.create({
      data: { apelido, nome, cpf, telefone, email, status, graduacao, funcao },
    });
    res.status(201).json(novoMembro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar membro' });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { apelido, nome, cpf, telefone, email, status, graduacao, funcao } = req.body;

  try {
    const membroAtualizado = await prisma.membro.update({
      where: { id: Number(id) },
      data: { apelido, nome, cpf, telefone, email, status, graduacao, funcao },
    });
    res.json(membroAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar membro' });
  }
};

const deletar = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.membro.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao excluir membro' });
  }
};

module.exports = {
  listar,
  criar,
  atualizar,
  deletar,
  validarMembro,
  obter
};
