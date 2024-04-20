# Sistema de Agendamento de Consultas Médicas

Este é um sistema de agendamento de consultas médicas que utiliza o backend em Node.js com o framework Express para criar uma API RESTful que interage com um banco de dados PostgreSQL. O frontend, desenvolvido com a biblioteca React, oferece uma interface para os usuários realizarem operações como agendar, consultar, alterar e excluir consultas médicas por CPF.

### Funcionalidades
- Criar uma nova consulta.
- Verificar consulta por CPF.
- Alterar agendamento de consulta por CPF.
- Excluir agendamento de consulta por CPF.

### Estrutura do Projeto
- backend/             # Código do servidor Node.js com o framework Express
  - controllers/       # Controladores das rotas
  - dao/               # Acesso ao banco de dados
  - models/            # Modelos de dados
  - routes/            # Rotas da API
  - index.js           # Ponto de entrada do servidor
  - ...

- frontend/            # Código do frontend com o framework Express
  - public/            # Arquivos estáticos
  - src/               # Código-fonte do frontend
  - ...

### Pré-requisitos
- Node.js e npm instalados.
- PostgreSQL instalado e configurado.

### Instalação
- 1. Clone o repositório:
git clone https://github.com/rraffaa/Consultas.git

- 2. Instale as dependências do backend:
cd .\backend\
npm install
node index.js # Para iniciar o servidor.

- 3. Inicie o frontend para interagir com a interface do usuário.

### Como testar

Abra um navegador e acesse: http://localhost:3000.