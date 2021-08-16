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