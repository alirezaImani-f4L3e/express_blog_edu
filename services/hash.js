const bcrypt = require('bcrypt');
const salt = 10;



exports.hash = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, salt)
}

exports.compare = (plainPassword, hashPassword) => {
    return bcrypt.compareSync(plainPassword, hashPassword)
}