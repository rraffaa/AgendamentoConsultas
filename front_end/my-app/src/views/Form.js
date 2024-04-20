import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function Form(props) {
    const { adicionarConsulta, alterarConsulta, excluirConsulta } = props;
    const [consulta, setConsulta] = useState({
        especialidade: "",
        profissional: "",
        data: "",
        nome: "",
        cpf: ""
    });
    const [cpfAcao, setCpfAcao] = useState("");
    const [message, setMessage] = useState("");  
    const [error, setError] = useState("");  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setConsulta({ ...consulta, [name]: value });
    };

    const handleAdicionarConsulta = async () => {
        try {
            await adicionarConsulta(consulta);
            setConsulta({
                especialidade: "",
                profissional: "",
                data: "",
                nome: "",
                cpf: ""
            });
            setMessage("Consulta adicionada com sucesso!"); 
            setError(""); 
        } catch (error) {
            console.error('Erro ao adicionar consulta, verifique os dados e tente novamente.', error);
            setMessage(""); 
            setError("Erro ao adicionar consulta"); 
        }
    };

    const handleAlterarConsulta = async () => {
        try {
            await alterarConsulta(cpfAcao, consulta);
            setConsulta({
                especialidade: "",
                profissional: "",
                data: "",
                nome: "",
                cpf: ""
            });
            setMessage("Consulta alterada com sucesso!"); 
            setError(""); 
        } catch (error) {
            console.error('Erro ao alterar consulta, verifique os dados e tente novamente.', error);
            setMessage(""); 
            setError("Erro ao alterar consulta"); 
        }
    };

    const handleExcluirConsulta = async () => {
        try {
            await excluirConsulta(cpfAcao);
            setConsulta({
                especialidade: "",
                profissional: "",
                data: "",
                nome: "",
                cpf: ""
            });
            setMessage("Consulta excluída com sucesso!"); 
            setError(""); 
        } catch (error) {
            console.error('Erro ao excluir consulta, verifique os dados e tente novamente.', error);
            setMessage(""); 
            setError("Erro ao excluir consulta"); 
        }
    };

    const handleVerificarConsulta = async () => {
        try {
            const response = await axios.get(`/consultas/verificar/${cpfAcao}`);
            const consultas = response.data;
            if (consultas.length > 0) {
                const consultaEncontrada = consultas[0]; 
                setConsulta({
                    especialidade: consultaEncontrada.especialidade,
                    profissional: consultaEncontrada.profissional,
                    data: consultaEncontrada.data,
                    nome: consultaEncontrada.nome,
                    cpf: consultaEncontrada.cpf
                });
                setMessage(`Consulta encontrada - Data: ${consultaEncontrada.data}, Especialidade: ${consultaEncontrada.especialidade}, Médico: ${consultaEncontrada.profissional}`); // Exibe mensagem de sucesso com os detalhes
                setError(""); 
            } else {
                setMessage(""); 
                setError("Consulta não encontrada"); 
            }
        } catch (error) {
            console.error('Erro ao verificar consulta, verifique os dados e tente novamente.', error);
            setMessage(""); 
            setError("Erro ao verificar consulta");
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="especialidade"
                    label="Especialidade"
                    variant="outlined"
                    name="especialidade"
                    value={consulta.especialidade}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="cpfAcao"
                    label="CPF da Consulta"
                    variant="outlined"
                    name="cpfAcao"
                    value={cpfAcao}
                    onChange={(event) => setCpfAcao(event.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleAdicionarConsulta}>
                    Adicionar Consulta
                </Button>
                <Button variant="contained" color="primary" onClick={handleAlterarConsulta}>
                    Alterar Consulta
                </Button>
                <Button variant="contained" color="primary" onClick={handleExcluirConsulta}>
                    Excluir Consulta
                </Button>
                <Button variant="contained" color="primary" onClick={handleVerificarConsulta}>
                    Verificar Consulta
                </Button>
            </Grid>
            {message && <Grid item xs={12}><p style={{ color: 'green' }}>{message}</p></Grid>}
            {error && <Grid item xs={12}><p style={{ color: 'red' }}>{error}</p></Grid>}
        </Grid>
    );
}

export default Form;