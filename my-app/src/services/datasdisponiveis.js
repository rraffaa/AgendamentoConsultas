import React from 'react';

const DatasDisponiveis = ({ datas }) => {
  return (
    <div>
      <h3>Datas Disponíveis:</h3>
      <ul>
        {datas.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
    </div>
  );
};

export default DatasDisponiveis;
