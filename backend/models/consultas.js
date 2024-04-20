const pool = require('../dao/database.js');

const Consulta = {
  createConsulta: async (especialidade, profissional, data, nome, cpf) => {
    const queryText = 'INSERT INTO consultas (especialidade, profissional, data, nome, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [especialidade, profissional, data, nome, cpf];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  },
  getConsultaPorCPF: async (cpf) => {
    const queryText = 'SELECT * FROM consultas WHERE cpf = $1';
    const { rows } = await pool.query(queryText, [cpf]);
    return rows;
  },
  updateConsultaPorCPF: async (cpf, especialidade, profissional, data, nome) => {
    const queryText = 'UPDATE consultas SET especialidade = $1, profissional = $2, data = $3, nome = $4 WHERE cpf = $5 RETURNING *';
    const values = [especialidade, profissional, data, nome, cpf];
    const { rows } = await pool.query(queryText, values);
    return rows[0];
  },
  deleteConsultaPorCPF: async (cpf) => {
    const queryText = 'DELETE FROM consultas WHERE cpf = $1 RETURNING *';
    const { rows } = await pool.query(queryText, [cpf]);
    return rows[0];
  },
};

module.exports = Consulta;