const express = require('express');
const bodyParser = require('body-parser');
const { request } = require('express');
const db = require("./connection");

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
  console.log(req.body);
  console.log(`received:  ${req.body.username}`)
  let body = req.body;
  // saving data to database   
  let command = `INSERT INTO volunteers(username, age, email, phone, location, contributions, date, duration) VALUES('${body.username}', ${parseInt(body.age)}, '${body.email}', '${body.phone}', '${body.location}', '${body.contributions}', '${body.date}', '${ body.duration}')`;
  console.log('command: ',command);
  db.query(command);
  res.send({'message':`Thanks for submitting, ${req.body.username}!`});
});


app.post('/del', cors(), function(req, res) {
  //   request = JSON.parse(req.body)
    console.log(req.body);
    console.log(`received:  ${req.body.username}`)
    let body = req.body;
    // saving data to database   
    let command = "TRUNCATE TABLE volunteers";
    db.query(command);
    res.send({'message':`Thanks for deleting all!`});
  });

app.listen(3000, function() {
  console.log('Server started on http://localhost:3000');
});

// posting data
// python3 code
/*

import requests
requests.post('http://localhost:3000', {'name':'anon'})
cols=('username', 'age', 'email', 'phone', 'location', 'contributions', 'date', 'duration')
values=('neumon', 116, 'neumon@neumon.neumon', '0100000000','DC', 'computer, economics, physics', '2023/02/16', '48 hours')

data = {}
for c, v in zip(cols, values):
    data[c] = v

print(data)
requests.post('http://localhost:3000/', data).text

*/