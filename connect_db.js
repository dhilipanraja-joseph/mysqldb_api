require('dotenv').config();
// require('console.table');

if(!process.env.MYSQL_PASSWORD){
  throw error('Missing evn vriable : ')
}
const mysql = require('mysql');

const connection = mysql.createConnection({
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
