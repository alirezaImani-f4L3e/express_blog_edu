const userModel = require('@models/user')
const hashService = require('@services/hash')
const userRoles = require('@models/constants/userConst')

exports.login = async(email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) return false;
    return hashService.compare(password, user.password) ? user : false;

}

exports.register = async(email, password) => {
    const inserId = await userModel.create({
        full_name: 'کاربر جدید',
        email,
        password,
        role: userRoles.USER
    })
    return inserId;
}