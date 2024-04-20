import React, { useState, useEffect } from "react";
import ConsultaList from "./views/consulta/List";
import ConsultaForm from "./views/consulta/Form";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";
import ConsultaAgendamento from "./services/consulta"; // Importe a classe ConsultaAgendamento
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const ConsultaSrv = new ConsultaAgendamento(axios, BACKEND_URL);

function App() {
  const [consultas, setConsultas] = useState([]);
  const [consultaEmEdicao, setConsultaEmEdicao] = useState(null);

  const carregarConsultas = async () => {
    try {
      const lista = await ConsultaSrv.get();
      setConsultas(lista);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  }

  useEffect(() => {
    carregarConsultas();
  }, []);

  const adicionarConsulta = async (novaConsulta) => {
    try {
      await ConsultaSrv.add(novaConsulta);
      carregarConsultas();
    } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
    }
  }

  const alterarConsulta = async (cpf, consultaAlterada) => {
    try {
      await ConsultaSrv.update(cpf, consultaAlterada);
      carregarConsultas();
    } catch (error) {
      console.error('Erro ao alterar consulta:', error);
    }
  }

  const excluirConsulta = async (cpf) => {
    try {
      await ConsultaSrv.remove(cpf);
      carregarConsultas();
    } catch (error) {
      console.error('Erro ao excluir consulta:', error);
    }
  }

  return (
    <div className="App">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Cadastro de Consultas
          </Typography>
          <Box p={5} mt={2}>
            {/* Passando as funções como props para o ConsultaList */}
            <ConsultaList
              consultas={consultas}
              setConsultaEmEdicao={setConsultaEmEdicao}
              consultarConsulta={ConsultaSrv.getConsultaPorCpf}
              excluirConsulta={excluirConsulta}
              adicionarConsulta={adicionarConsulta}
              alterarConsulta={alterarConsulta}
            />
          </Box>
        </CardContent>

        {consultaEmEdicao && (
          <CardContent>
            <Box p={5}>
              <Typography variant="h6" component="div">
                {consultaEmEdicao.nova ? "Nova" : "Alterando"} Consulta
              </Typography>
              <ConsultaForm
                consultaEmEdicao={consultaEmEdicao}
                adicionarConsulta={adicionarConsulta}
                alterarConsulta={alterarConsulta}
                consultarConsultas={carregarConsultas}
                setConsultaEmEdicao={setConsultaEmEdicao}
              />
            </Box>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default App;