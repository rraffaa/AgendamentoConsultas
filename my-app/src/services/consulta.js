import axios from 'axios';

class ConsultaAgendamento {
  constructor(httpClient, baseURL) {
    this.httpClient = httpClient;
    this.baseURL = baseURL;
  }

  async get() {
    try {
      const response = await this.httpClient.get(`${this.baseURL}/consultas`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter consultas:', error);
    }
  }

  async add(novaConsulta) {
    try {
      const response = await this.httpClient.post(`${this.baseURL}/consultas`, novaConsulta);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao adicionar consulta:', error);
    }
  }

  async update(cpf, consultaAtualizada) {
    try {
      const response = await this.httpClient.patch(`${this.baseURL}/consultas/${cpf}`, consultaAtualizada);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar consulta:', error);
    }
  }

  async remove(cpf) {
    try {
      const response = await this.httpClient.delete(`${this.baseURL}/consultas/${cpf}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao excluir consulta:', error);
    }
  }

  async getConsultaPorCpf(cpf) {
    try {
      const response = await this.httpClient.get(`${this.baseURL}/consultas/consultas/${cpf}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao obter consulta por CPF:', error);
    }
  }
}

export default ConsultaAgendamento;