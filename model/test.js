// 引入
const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
  host: '118.31.245.237',
  user: 'luoluqi',
  password:'Luoluqi00',
  database: 'zhongqiu',
  charset:'utf8',
});

// 简单查询
connection.query(
  'SELECT * FROM `user`',
  function(err, results, fields) {
      console.log("--------------");
      console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);