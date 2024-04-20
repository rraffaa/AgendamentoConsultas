import React, { useContext } from 'react';
import { EspecialidadeProfissionalContext } from './contexts/especialidadeProfissional';

const EspecialidadeSelecionar = ({ onSelecionarEspecialidade }) => {
  const especialidades = useContext(EspecialidadeProfissionalContext);

  return (
    <div>
      <label htmlFor="especialidade">Especialidade:</label>
      <select id="especialidade" onChange={(e) => onSelecionarEspecialidade(e.target.value)}>
        {Object.keys(especialidades).map((especialidade, index) => (
          <option key={index} value={especialidade}>{especialidade}</option>
        ))}
      </select>
    </div>
  );
};

export default EspecialidadeSelecionar;