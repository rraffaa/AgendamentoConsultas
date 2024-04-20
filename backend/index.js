const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./dao/database.js');
const consultaDao = require('./dao/consultas.js');
const consultasRouter = require('./routes/consultas.js');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.json());

// Rota para agendar consulta
app.post('/agendarConsulta', async (req, res) => {
  const { especialidade, profissional, data, nome, cpf } = req.body;
  const queryText = 'INSERT INTO consultas (especialidade, profissional, data, nome, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [especialidade, profissional, data, nome, cpf];
  try {
    const { rows } = await pool.query(queryText, values);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao agendar consulta:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao agendar consulta.' });
  }
});

// Rota para buscar consulta por CPF
app.get('/consultasPorCPF/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const queryText = 'SELECT * FROM consultas WHERE cpf = $1';
  try {
    const { rows } = await pool.query(queryText, [cpf]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar consulta por CPF:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao buscar consulta.' });
  }
});

// Rota para alterar consulta por CPF
app.put('/alterarConsulta/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { especialidade, profissional, data, nome } = req.body;
  const queryText = 'UPDATE consultas SET especialidade = $1, profissional = $2, data = $3, nome = $4 WHERE cpf = $5 RETURNING *';
  const values = [especialidade, profissional, data, nome, cpf];
  try {
    const { rows } = await pool.query(queryText, values);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ success: false, message: 'Consulta não encontrada para o CPF fornecido.' });
    }
  } catch (error) {
    console.error('Erro ao alterar consulta:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao alterar consulta.' });
  }
});

// Rota para excluir consulta por CPF
app.delete('/excluirConsulta/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const queryText = 'DELETE FROM consultas WHERE cpf = $1 RETURNING *';
  try {
    const { rows } = await pool.query(queryText, [cpf]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ success: false, message: 'Consulta não encontrada para o CPF fornecido.' });
    }
  } catch (error) {
    console.error('Erro ao excluir consulta:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao excluir consulta.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});