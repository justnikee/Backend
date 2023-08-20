const JWT = require('jsonwebtoken');
const { Users } = require('../model/users');


const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}


const isAdmin = async(req, res, next) => {
   try {
    const user = await Users.findById(req.user._id);
    console.log(user.role)
    if(user.role != 1){
        return res.status(401).send({
            success : false,
            message: 'Unauthorize Access!'
        });
    }
    next();
   } catch (error) {
    console.log(error)
    res.status(401).send({
        success: false,
        error,
        message: 'isAdmin middleware error!'
    })
   }
}

module.exports = {
    requireSignIn,
    isAdmin
}