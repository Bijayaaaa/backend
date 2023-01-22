## replit:
https://replit.com/@AanandaGiri/vertexhacks#server.js
https://vertexhacks.aanandagiri.repl.co/

## Github
https://github.com/team-hustler/backend
connectionString in connection.js is address given by: `ngrok tcp 5432`

## EndPoints:

* GET https://vertexhacks.aanandagiri.repl.co
* (localhost) GET   http://localhost:3000
  - list of registered users
- Example: open url in browser

* POST  https://vertexhacks.aanandagiri.repl.co
* (localhost) POST  http://localhost:3000
  - params: (username<str>, age<int>, email<str>, phone<str:10>, location<str>, contributions<str>, date<str>, duration<str>)
  - To add new user
- Example:
  

```
// <nodejs code> : create new uesr
const axios = require('axios');

const data = {
    username: 'ritik',
    age: 116,
    email: 'neumon@neumon.neumon',
    phone: '0100000000',
    location: 'DC',
    contributions: 'computer, economics, physics',
    date: '2023/02/16',
    duration: '48 hours'
};
console.log(data);

axios.post('https://vertexhacks.aanandagiri.repl.co/', data).then(response => {
        console.log(response.data);
    })    .catch(error => {
        console.log(error);
    });
```

```
# <python code> Test create new uesr
import requests
data = {'username': 'ritik', 'age': 116, 'email': 'neumon@neumon.neumon', 'phone': '0100000000', 'location': 'DC', 'contributions': 'computer, economics, physics', 'date': '2023/02/16', 'duration': '48 hours'}
print(data)
requests.post('https://vertexhacks.aanandagiri.repl.co/', data).text
```

* POST https://vertexhacks.aanandagiri.repl.co/sms
* (localhost) POST http://localhost:3000/sms
  - params: (messsage, to) 
  - to send sms<br>
- Example:

```
# <nodejs code> : /truncate endpoint
const axios = require('axios');

const data = {to:'phone_number', message:'should work'}
axios.post('https://vertexhacks.aanandagiri.repl.co/sms', data).then(response => {
        console.log(response.data);
    })    .catch(error => {
        console.log(error);
    });
```

```<python code> :  /sms endpoint
import requests
data = {'to':'phone_number', 'message':'hi'}
requests.post('https://vertexhacks.aanandagiri.repl.co/sms', data).text

```

* POST https://vertexhacks.aanandagiri.repl.co/truncate
* (localhost) POST http://localhost:3000/truncate
  - To truncate the database
```# Example :: <python code> : /truncate endpoint
import requests
requests.post('https://vertexhacks.aanandagiri.repl.co/truncate', {}).text

```

# To Do?
3. File Coin

## Installations
npm init
node -v & npm -v  # node and npm version
npm install passport-local  #login
npm install pg              # Connect to postgresql
npm install express         # for webserver
npm install cors            # API permissions
npm install dotenv

## To run
`nodemon server.js`

# references: 
* postgresql with node
https://github.com/oliverjam/learn-node-postgres

* nodemon and express
https://medium.com/analytics-vidhya/very-simple-rest-api-using-express-js-5e4ebfad0af2

* cors:
https://stackabuse.com/handling-cors-with-node-js/



### Postgresql setup

sudo su - postgres
psql

CREATE USER vertex SUPERUSER PASSWORD 'vertex';
CREATE DATABASE vertex_db WITH OWNER vertex;
\connect vertex_db



<!-- create -->
BEGIN;

DROP TABLE IF EXISTS volunteers CASCADE;

CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  email VARCHAR(255),
  phone VARCHAR(10),
  location VARCHAR(255),
  contributions VARCHAR(255),
  date  VARCHAR(10),
  duration VARCHAR(10)
);

COMMIT;



<!-- insert values -->
INSERT INTO volunteers (username, age, email, phone, location, contributions, date, duration) VALUES
  ('neumon', 116, 'neumon@neumon.neumon', '0100000000','DC', 'computer, economics, physics', '2023/02/16', '48 hours');

select * from volunteers;


<!-- connect -->
psql volunteer

\include workshop/database/init.sql

\dt
<!-- verify database created -->

## locally host postgresql db
ngrok tcp 5432

# 
psql -U postgres -h localhost -p 5432 postgres

# 
ngrok tcp 5432

# Connecting to PostgreSQL
psql -h 0.tcp.ngrok.io -p 17618 -U postgres -d postgres