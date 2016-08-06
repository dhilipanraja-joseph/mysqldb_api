const connection = require('./connect_db');
const uuid = require('uuid');



connection.query(`create table if not exists cities (
                  id varchar(50),
                  city varchar(50),
                  state varchar(50),
                  population int)`,
  err=>{
    if(err){
        console.log('Error creating table',err);
    }
});

exports.allCities = (cb) => {

  connection.query('select * from cities',(err,cities)=>{
    cb(err,cities);
  });

}

exports.getCity = (id,cb)=>{

  connection.query(`select * from cities where id="${id}"`,(err,city)=>{
    cb(err,city);
  });
}

exports.addCity = (obj,cb)=>{
// console.log(obj);
  connection.query(`insert into cities
    values("${uuid.v4()}",
    "${obj.city}",
    "${obj.state}",
    "${obj.population}")`,
    err=> {
      if (err) console.log('Error inserting row',err);
      else cb(err);
    });
}

exports.deleteCity = (id,cb)=>{

  // console.log(id);
  connection.query(`delete from cities where id="${id}"`,
  err=>{
    err ? console.log('Error deleting row',err) : cb(err);
  });
}

exports.updateCity = (arr,cb)=>{
  let obj=arr[1],id=arr[0];
  let objkey = Object.keys(obj);
    console.log(obj);
    let str='update cities set ';
    objkey.forEach(key=>{
      console.log('obj val',key,obj[key]);
      str += `${key}="${obj[key]}",`;
    });
    str = str.slice(0,-1)+` where id="${id}"`;
    // console.log(str);
    connection.query(str,err=>{
      err ? console.log('Error updating row',err) : cb(err);
    });

  // console.log(Object.keys(obj));
  // connection.query(`update `);
}
