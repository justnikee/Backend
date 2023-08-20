const bcrypt = require('bcrypt');

const hashPass = async(password) => {
      try {
      const saltRounds  = 5;
      const hashedPass = await bcrypt.hash(password, saltRounds);
      return hashedPass;
      } catch (error) {
        console.log(error)
      }
}

const comparePass = async(password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
}

module.exports = {
    hashPass,
    comparePass
}