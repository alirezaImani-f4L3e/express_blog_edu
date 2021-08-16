const db = require('@dataBase/mysql')
const hashService = require('@services/hash')

exports.findAll = async(columns = []) => {
    const needdedCols = columns.length ? columns.join(',') : '*';
    const [result] = await db.query(`select ${needdedCols} from users`);
    return result;
}

exports.create = async(userData) => {

    const updatedData = {...userData, password: hashService.hash(userData.password) }
    const [result] = await db.query('insert into users set ?', [updatedData]);
    return result.insertId;
}

exports.delete = async(userId) => {
    const [result] = await db.query('delete from users where id =? limit 1', userId)

    return result.affectedRows > 0;
}

exports.findByEmail = async(email) => {
    const [rows] = await db.query('select * from users where email=? limit 1', email)
    return rows.length == 1 ? rows[0] : null;
}