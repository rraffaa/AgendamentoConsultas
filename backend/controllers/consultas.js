const { getUsersData, getUserData, newUser, removeUser, editUser } = require('../models/consultas.js');
const consultaDao = require('../dao/consultas.js');

const getUsers = async (req, res) => {
    const users = await getUsersData();
    console.log(`Horários disponíveis para marcação de consultas na data [${calendario}]`);
    res.send(users);
}

const createUser = (req, res) => {   
    const user = req.body;
    newUser(user);
    const message = `Agendamento confirmado para a consulta no dia [${calendario}] para o paciente [${user.nome}].`
    res.status(201).send(message);
    console.log(message);
};

const getUser = async (req, res) => {
    const user = await getUserData(req.params.id);
    if (user) { 
        res.send(user);
        const message = `Este paciente [${user.nome}] tem uma consulta marcada para o dia [${calendario}].`;
    } else {
        res.status(404).send("Consulta não encontrada neste CPF.");
    }
};

const deleteUser = async (req, res) => { 
    const result = await removeUser(req.params.id);
    const status = result ? 200 : 404;
    const message = result ? `Consulta do dia ${req.params.id} foi cancelada.` : "Consulta não encontrada.";
    console.log(message);
    res.status(status).send(message);
};

const updateUser = async (req,res) => {
    editUser(req.params.CPF, req.body);
    const message = `Consulta alterada para o dia [${req.body.calendario}].`; 
    console.log(message);
    res.status(200).send(message);
};

module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser
};