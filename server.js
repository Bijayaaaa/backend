const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const db = require("./connection");
let axios = require('axios');

const cors = require('cors');
const app = express();
app.use(cors())
// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', cors(), function(req, res) {
    let users;
  // let users = [];
  // db.query("SELECT * FROM USERS").then((result) => {users.push(result); users=users.toString()});
  // let users= db.query("SELECT * FROM USERS").then((result)=>{result.toString()});
  const data=async()=>{
    users=await db.query("SELECT * FROM VOLUNTEERS")
    users = users.rows;
    // console.log("users: ",users)
    console.log('ping: http://localhost:3000')

    res.send({'users': JSON.stringify(users), 'note':'To add new user please post to: http://localhost:3000/ with data format similar to users listed above'});
  }
  users = data()
});

app.post('/', cors(), function(req, res) {
//   request = JSON.parse(req.body)
  // console.log(`body: ${req.body}`);
  console.log(`received username:  ${req.body.username}`)
  // console.log(`received data.username:  ${req.body.data.username}`)
  let body = req.body;
  // saving data to database   
  let command = `INSERT INTO volunteers(username, age, email, phone, location, contributions, date, duration) VALUES('${body.username}', ${parseInt(body.age)}, '${body.email}', '${body.phone}', '${body.location}', '${body.contributions}', '${body.date}', '${ body.duration}')`;
  console.log('command: ',command);
  db.query(command);
  res.send({'message':`Thanks for submitting, ${req.body.username}!`});
});

/*

// <python code> Test create new uesr
import requests
data = {'username': 'neumon', 'age': 116, 'email': 'neumon@neumon.neumon', 'phone': '0100000000', 'location': 'DC', 'contributions': 'computer, economics, physics', 'date': '2023/02/16', 'duration': '48 hours'}
print(data)
requests.post('http://localhost:3000/', data).text

*/


app.post('/truncate', cors(), function(req, res) {
  //   request = JSON.parse(req.body)
    console.log(req.body);
    console.log(`received:  ${req.body.username}`)
    let body = req.body;
    // saving data to database   
    let command = "TRUNCATE TABLE volunteers";
    db.query(command);
    res.send({'message':`Thanks for deleting all!`});
  });

  app.post('/sms', cors(), function(req, res) {
    //   request = JSON.parse(req.body)
      console.log(req.body);
      console.log(`messege:  ${req.body.message}, to: ${req.body.to}`)
      function send_sms(message,to){
        axios.post('http://api.sparrowsms.com/v2/sms/', {'token' : 'v2_joU8zjr0iUPyzagTsh3V7LJRpr3.5mtq',
            'from' : 'TheAlert',
            'to' : to,
            'text' : message}
        ).then(function(response){console.log(response);})
        .catch(function(error){console.log(error);})

      }
      send_sms(req.body.message, req.body.to)
      res.send({'message':`messege sent!`});
    });
/*
# <python code> : Test /sms endpoint
import requests
requests.post('https://vertexhacks.aanandagiri.repl.co/sms', {'to':'9840445934', 'message':'hi'}).text


*/

app.listen(3000, function() {
  console.log('Server started on http://localhost:3000');
});
