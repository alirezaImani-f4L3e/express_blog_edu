const db = require('@dataBase/mysql')
const commentStatus = require('./commentsStatus')

exports.findAll = async() => {
    const [rows] = await db.query(`
        select c.* ,p.title
        from comments c
        join posts p on c.post_id =p.id
        order by commented_at desc
    `);
    return rows;
}

exports.findLatest = async(limit) => {
    const [rows] = await db.query(`
        select c.* ,p.title
        from comments c
        join posts p on c.post_id =p.id
        order by commented_at desc limit ?
    `, limit);
    return rows;
}

exports.find = async(postId) => {
    const [rows] = await db.query(`
        select p.*,u.full_name
        from posts p
        join users u on p.author_id=u.id
        where p.id =? limit 1
    `, postId);


    return rows.length > 0 ? rows[0] : false;
}

exports.create = async(postData) => {
    const [result] = await db.query('insert into posts set ?', [postData]);
    console.log(result);
    return result;
}

exports.delete = async(commentId) => {
    const [result] = await db.query('delete from comments where id =? limit 1', commentId)

    return result.affectedRows > 0;
}

exports.update = async(postId, Updated) => {
    const [result] = await db.query('update posts set ? where id=? limit 1', [Updated, postId])
    return result.affectedRows > 0;
}

exports.approve = async(commentId) => {
    const [result] = await db.query('update comments set status=? where id=?', [commentStatus['APPROVED'], commentId])
    return result.affectedRows > 0;
}
exports.reject = async(commentId) => {
    const [result] = await db.query('update comments set status=? where id=?', [commentStatus['REJECTED'], commentId])
    return result.affectedRows > 0;
}