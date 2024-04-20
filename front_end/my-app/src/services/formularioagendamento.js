import React, { useState } from 'react';

const FormularioAgendamento = ({ onSubmitAgendamento }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitAgendamento({ nome, cpf, dataAgendamento });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <input type="date" value={dataAgendamento} onChange={(e) => setDataAgendamento(e.target.value)} />
      <button type="submit">Agendar Consulta</button>
    </form>
  );
};

export default FormularioAgendamento;