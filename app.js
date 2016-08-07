
const PORT = process.env.PORT || 8080;

const mysql = require('mysql');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const connection = require('./connection');
const city = require('./cities');
const app = express();

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{

  res.render('index');
});
app.route('/cities')
  .get((req,res)=>{
    city.allCities((err,cities)=>{
      if(err){
        res.status(400).send(err);
      }else{
        res.send(cities);
      }
    });
  })
  .post((req,res)=>{
    // console.log('req body',req.body);
    city.addCity(req.body,err=>{
      if(err){
        res.status(400).send(err);
      }else{
        res.send();
      }
    });
  });

app.route('/cities/:id')
  .get((req,res)=>{
    city.getCity(req.params.id,(err,city)=>{
      if (err) res.status(400).send(err);
      else res.send(city);
    });
  })
  .delete((req,res)=>{
    city.deleteCity(req.params.id,err=>{

      if (err) res.status(400).send(err);
      else res.send();

    });

  })
  .put((req,res)=>{
    var arr=[req.params.id,req.body];
    city.updateCity(arr,err=>{

      if (err) res.status(400).send(err);
      else res.send();
    });
  });


app.listen(PORT,err=>{
  console.log(err || `Server listening on port ${PORT}`);
});
