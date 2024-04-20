import React, { useContext } from 'react';
import { EspecialidadeProfissionalContext } from './contexts/especialidadeProfissional';

const ProfissionalSelecionar = ({ onSelecionarProfissional }) => {
  const especialidades = useContext(EspecialidadeProfissionalContext);

  const handleSelecionarEspecialidade = (especialidade) => {
    const profissionais = especialidades[especialidade] || [];
    onSelecionarProfissional(profissionais[0]);
  };

  return (
    <div>
      <label htmlFor="especialidade">Especialidade:</label>
      <select id="especialidade" onChange={(e) => handleSelecionarEspecialidade(e.target.value)}>
        {Object.keys(especialidades).map((especialidade, index) => (
          <option key={index} value={especialidade}>{especialidade}</option>
        ))}
      </select>

      <label htmlFor="profissional">Profissional:</label>
      <select id="profissional" onChange={(e) => onSelecionarProfissional(e.target.value)}>
        {especialidades['Cardiologia'].map((profissional, index) => (
          <option key={index} value={profissional}>{profissional}</option>
        ))}
      </select>
    </div>
  );
};

export default ProfissionalSelecionar;