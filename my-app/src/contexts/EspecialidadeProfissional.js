import React, { createContext, useState } from 'react';

const especialidadesEMedicos = {
    'Cardiologia': ['Dr. Cláudio', 'Dra. Hortênsia'],
    'Dermatologia': ['Dra. Fabiana'],
    'Ortopedia': ['Dra. Maria', 'Dr. Alberto'],
    'Otorrinolaringologia': ['Dra. Marta', 'Dr. André', ]
  };

  const EspecialidadeProfissionalContext = createContext();

  export const EspecialidadeProfissionalProvider = ({ children }) => {
    return (
      <EspecialidadeProfissionalContext.Provider value={especialidadesEMedicos}>
        {children}
      </EspecialidadeProfissionalContext.Provider>
    );
  };
  
  export const useEspecialidadeProfissional = () => {
    return useContext(EspecialidadeProfissionalContext);
  };