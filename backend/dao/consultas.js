const pool = require('./database');

class consultaDao {
    constructor(db) {
      this.db = db;
    }
     
    async criarConsulta(especialidade, profissional, data, nome, cpf) {
        const queryText = 'INSERIR NA consultas(especialidade, profissional, data, nome, cpf) VALORES($1, $2, $3, $4, $5) RETORNANDO *';
        const valores = [especialidade, profissional, data, nome, cpf];
        try {
          const { rows } = await this.db.query(queryText, valores);
          return { success: true, message: 'Consulta agendada com sucesso!' };
        } catch (error) {
          console.error('Erro ao agendar consulta:', error);
          return { success: false, message: 'Erro ao agendar consulta.' };
        }
      }
  
      async getConsultaPorCPF(cpf) {
        const queryText = 'SELECIONAR * DE consultas ONDE cpf = $1';
        try {
          const { rows } = await this.db.query(queryText, [cpf]);
          if (rows.length > 0) {
            return { success: true, message: 'Consulta encontrada.', consulta: rows };
          } else {
            return { success: false, message: 'Nenhuma consulta encontrada para este CPF.' };
          }
        } catch (error) {
          console.error('Erro ao buscar consulta:', error);
          return { success: false, message: 'Erro ao buscar consulta.' };
        }
      }     
  
    async atualizarConsultaPorCPF(cpf, especialidade, profissional, data, nome) {
        const queryText = 'ATUALIZAR consultas CONFIGURAR especialidade = $2, profissional = $3, data = $4, nome = $5 ONDE cpf = $1 RETORNANDO *';
        const valores = [cpf, especialidade, profissional, data, nome];
        try {
          const { rows } = await this.db.query(queryText, valores);
          if (rows.length > 0) {
            return { success: true, message: 'Consulta atualizada com sucesso!' };
          } else {
            return { success: false, message: 'Consulta não encontrada para atualização.' };
          }
        } catch (error) {
          console.error('Erro ao atualizar consulta:', error);
          return { success: false, message: 'Erro ao atualizar consulta.' };
        }
      }
      
      async excluirConsulta(cpf) {
        const queryText = 'EXCLUIR DE consultas ONDE cpf = $1 RETORNANDO *';
        try {
          const { rows } = await this.db.query(queryText, [cpf]);
          if (rows.length > 0) {
            return { success: true, message: 'Consulta excluída com sucesso!' };
          } else {
            return { success: false, message: 'Consulta não encontrada para exclusão.' };
          }
        } catch (error) {
          console.error('Erro ao excluir consulta:', error);
          return { success: false, message: 'Erro ao excluir consulta.' };
        }
      }
      
  }
  
  module.exports = consultaDao;
  