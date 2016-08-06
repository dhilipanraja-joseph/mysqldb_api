require('dotenv').config();
// require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL || {
  host:'localhost',
  user:'root',
  password:process.env.MYSQL_PASSWORD,
  database:'testdb'
});

connection.connect();


module.exports = connection;

// connection.query('select * from city',(err,rows,fields)=>{
//
//   console.log('err',err);
//   console.log('rows',rows);
//   // console.log('fields',fields);
// })
