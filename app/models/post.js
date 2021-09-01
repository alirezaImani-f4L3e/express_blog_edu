const db = require('@dataBase/mysql')

exports.findAll = async(page = 1, per_page = 5) => {
    const offset = (page - 1) * per_page;
    const [rows] = await db.query(`
        select p.*,u.full_name
        from posts p
        left join users u on p.author_id=u.id
        order by p.posted_at desc
        limit ${offset},${per_page}
    `);
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

    return result.insertId;
}

exports.delete = async(postId) => {
    const [result] = await db.query('delete from posts where id =? limit 1', postId)

    return result.affectedRows > 0;
}

exports.update = async(postId, Updated) => {
    const [result] = await db.query('update posts set ? where id=? limit 1', [Updated, postId])
    return result.affectedRows > 0;
}

exports.findById = async(postId) => {
    const [post] = await db.query(`
    select * 
    from posts
    where id =?
    limit 1
    `, [postId]);
    return post[0];
}

exports.findByKeyword = async(keyword) => {
    const [rows] = await db.query(`
        select p.*,u.full_name
        from posts p
        left join users u on p.author_id=u.id
        where p.title like ? or p.content like ?
        order by p.posted_at desc       
    `, ['%' + keyword + '%', '%' + keyword + '%']);
    return rows;
}