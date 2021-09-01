const db = require('@dataBase/mysql')


exports.findAll = async() => {
    const [result] = await db.query(`
    select * 
    from settings
    `);
    return result;
}

exports.update = async(updatedSetting) => {
    Object.keys(updatedSetting).forEach(item => {
        db.query(`update settings set setting_value=? where setting_name=?`, [updatedSetting[item], item]);
    })
}

exports.get = async(key) => {
    const [rows] = await db.query(`
    select setting_value 
    from settings
    where setting_name=?
    limit 1
    `, [key]);


    return rows.length > 0 ? rows[0].setting_value : null
}