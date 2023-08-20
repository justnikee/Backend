const { hashPass } = require('../helpers/passDcrypt');
const model = require('../model/users');
const Users = model.Users;


// const registerUser = async(req, res) => {
//     try {
//         const {firstName, lastName, age, email, phone, address, password } = req.body;
//         if(!firstName | !lastName | !age | !email | !phone | !address){
//             return res.status(404).json({message: 'all fields required!'});
//         }

//         const existingUser = Users.findOne({email});
//         if(existingUser){
//             return res.status(200).json({message: 'User Already Exist! Please Login.'})
//         }

//         const hashPass = await hashPass(password);

//         const user = new Users({firstName, lastName, age, email, phone, address, password: hashPass}).save();
        
//         return res.status(201).json(user);
//         console.log(user)
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, age, email, phone, address, password } = req.body;
        if (!firstName || !lastName || !age || !email || !phone || !address || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User Already Exists! Please Login.' });
        }

        const hashPasss = await hashPass(password);

        const user = await new Users({ firstName, lastName, age, email, phone, address, password: hashPasss }).save();

        console.log(user);

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const createUser = (req, res) => {
    console.log(req.body);
    Users.push(req.body);
    res.json(req.body)
}

const getAllUsers = async(req, res) => {
    const users = await Users.find();
    res.status(201).json(users);
}

const getUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const user = Users.find(prod => prod.id === id);
    const rez = res.json(user);
    console.log(rez)
}

const replaceUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = Users.findIndex(prod => prod.id === id);
    Users.splice(userIndex, 1, {...req.body, id});
    res.status(201).json({message : "updated"});
}

const updateUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = Users.findIndex(prod => prod.id === id);
    const user = Users[userIndex]
    Users.splice(userIndex, 1, {...user,...req.body});
    res.status(201).json({message : "Patched"});
}

const deleteUsers = (req, res) => {
    console.log(req.params)
    const id = +req.params.id;
    const userIndex = Users.findIndex(prod => prod.id === id);
    const user = Users[userIndex]
    Users.splice(userIndex, 1);
    res.status(201).json(user);
}

module.exports = {
    registerUser,
    getAllUsers,
    getUsers,
    createUser,
    updateUsers,
    replaceUsers,
    deleteUsers
}