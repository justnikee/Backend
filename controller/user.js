const { hashPass, comparePass } = require("../helpers/passDcrypt");
const model = require("../model/users");
const Users = model.Users;
const JWT = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, age, email, phone, address, password } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !age ||
      !email ||
      !phone ||
      !address ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User Already Exists! Please Login." });
    }
    const hashPasss = await hashPass(password);

    const user = await new Users({
      firstname,
      lastname,
      age,
      email,
      phone,
      address,
      password: hashPasss,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User Created Successfully 😊",
      user,
    });

    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        sucess: false,
        message: "Both fields require!",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "User Not Found! SignUp",
      });
    }

    const matchPass = await comparePass(password, user.password);

    if (!matchPass) {
      return res.status(200).send({
        sucess: false,
        message: "Password Not Matched!",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      sucess: true,
      message: "Login Success!",
      user: {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        phone: user.phone,
        address: user.address,
        userid: user._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      sucess: false,
      message: "Failed!",
      error,
    });
  }
};

const testUser = (req, res) => {
  res.status(200).json({ message: "protected" });
};

const createUser = (req, res) => {
  console.log(req.body);
  Users.push(req.body);
  res.json(req.body);
};

const getAllUsers = async (req, res) => {
  const users = await Users.find();
  res.status(201).json(users);
};

const getUsers = (req, res) => {
  // console.log(req.params)
  // const id = +req.params.id;
  // const user = Users.find(prod => prod.id === id);
  // const rez = res.json(user);
  // console.log(rez)
};

const replaceUsers = (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  const userIndex = Users.findIndex((prod) => prod.id === id);
  Users.splice(userIndex, 1, { ...req.body, id });
  res.status(201).json({ message: "updated" });
};

const updateUsers = (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  const userIndex = Users.findIndex((prod) => prod.id === id);
  const user = Users[userIndex];
  Users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json({ message: "Patched" });
};

const deleteUsers = (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  const userIndex = Users.findIndex((prod) => prod.id === id);
  const user = Users[userIndex];
  Users.splice(userIndex, 1);
  res.status(201).json(user);
};

module.exports = {
  registerUser,
  userLogin,
  getAllUsers,
  getUsers,
  createUser,
  updateUsers,
  replaceUsers,
  deleteUsers,
  testUser,
};
