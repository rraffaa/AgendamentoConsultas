const { getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/consultas.js');
const express = require('express');
const Consulta = require('../models/consultas.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

// Rota para agendar uma consulta
router.post('/appointments', async (req, res) => {
  try {
    const { especialidade, profissional, data, nome, cpf } = req.body;
    const novaConsulta = new Consulta({
      especialidade,
      profissional,
      data,
      nome,
      cpf,
    });
    await novaConsulta.save();
    res.status(201).json({ message: 'Agendamento criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar agendamento.' });
  }
});

// Rota para pesquisar agendamento por CPF
router.get('/consultas/verificar/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const consulta = await Consulta.findOne({ cpf });
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    const { especialidade, profissional, data } = consulta;
    res.json({ especialidade, profissional, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar consulta por CPF' });
  }
});

// Rota para alterar agendamento por CPF
router.patch('/consultas/alterar/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const consultaAtualizada = await Consulta.findOneAndUpdate({ cpf }, req.body, { new: true });
    if (!consultaAtualizada) {
      return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    res.status(200).json({ message: 'Consulta atualizada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar consulta' });
  }
});

// Rota para exclusão de consulta por CPF
router.delete('/consultas/excluir/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const consultaExcluida = await Consulta.findOneAndDelete({ cpf });
    if (!consultaExcluida) {
      return res.status(404).json({ error: 'Consulta não encontrada' });
    }
    res.status(200).json({ message: 'Consulta excluída com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir consulta' });
  }
});

module.exports = router;