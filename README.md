
## To run
`node server.js`


# references: 
* postgresql with node
https://github.com/oliverjam/learn-node-postgres

* nodemon and express
https://medium.com/analytics-vidhya/very-simple-rest-api-using-express-js-5e4ebfad0af2

* cors:
https://stackabuse.com/handling-cors-with-node-js/
npm install express cors



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