import React, { useState } from 'react';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import axios from 'axios';

const AgendarConsultaForm = () => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        especialidade: '',
        profissional: '',
        data: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/appointments', formData);
            console.log(response.data); 
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
        }
    };

    const handleVerificarConsulta = async () => {
        try {
            const response = await axios.get(`/consultas/verificar/${formData.cpf}`);
            console.log(response.data); 
        } catch (error) {
            console.error('Erro ao verificar consulta:', error);
        }
    };

    const handleAlterarConsulta = async () => {
        try {
            const response = await axios.patch(`/consultas/consultas/${formData.cpf}`, formData);
            console.log(response.data); 
        } catch (error) {
            console.error('Erro ao alterar consulta:', error);
        }
    };

    const handleExcluirConsulta = async () => {
        try {
            const response = await axios.delete(`/consultas/consultas/${formData.cpf}`);
            console.log(response.data); 
        } catch (error) {
            console.error('Erro ao excluir consulta:', error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Agendar Consulta</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Nome Completo"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="CPF"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Especialidade</InputLabel>
                    <Select
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Cardiologia">Cardiologia</MenuItem>
                        <MenuItem value="Dermatologia">Dermatologia</MenuItem>
                        <MenuItem value="Ortopedia">Ortopedia</MenuItem>
                        <MenuItem value="Otorrinolaringologia">Otorrinolaringologia</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Profissional</InputLabel>
                    <Select
                        name="profissional"
                        value={formData.profissional}
                        onChange={handleChange}
                        required
                    >
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    type="date"
                    label="Data"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Agendar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleVerificarConsulta}>
                    Verificar Consulta
                </Button>
                <Button variant="contained" color="default" onClick={handleAlterarConsulta}>
                    Alterar Consulta
                </Button>
                <Button variant="contained" color="default" onClick={handleExcluirConsulta}>
                    Excluir Consulta
                </Button>
            </Grid>
        </Grid>
    );
};

export default AgendarConsultaForm;