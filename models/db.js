import mysql from "mysql2/promise";
// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',      // 数据库地址
    user: 'root',           // 数据库用户名
    password: '123456', // 数据库密码
    database: 'shop',  // 数据库名称
    waitForConnections: true,
    connectionLimit: 10,    // 最大连接数
    queueLimit: 0,
    port: 3308
});

export default pool;