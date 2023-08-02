const fs = require('fs')
const data = JSON.parse(fs.readFileSync('products.json' , 'utf-8' ))
const users = data.users;


const createUser = (req, res) => {
    console.log(req.body);
    users.push(req.body);
    res.json(req.body)
}

const getAllUsers = (req, res) => {
    res.json(users);
}

const getUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const user = users.find(prod => prod.id === id);
    const rez = res.json(user);
    console.log(rez)
}

const replaceUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = users.findIndex(prod => prod.id === id);
    users.splice(userIndex, 1, {...req.body, id});
    res.status(201).json({message : "updated"});
}

const updateUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = users.findIndex(prod => prod.id === id);
    const user = users[userIndex]
    users.splice(userIndex, 1, {...user,...req.body});
    res.status(201).json({message : "Patched"});
}

const deleteUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = users.findIndex(prod => prod.id === id);
    const user = users[userIndex]
    users.splice(userIndex, 1);
    res.status(201).json(user);
}

module.exports = {
    getAllUsers,
    getUsers,
    createUser,
    updateUsers,
    replaceUsers,
    deleteUsers
}