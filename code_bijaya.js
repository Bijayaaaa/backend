const { pg } = require("pg");
const dotenv = require("dotenv");

// dotenv.config();
// const connectionString = process.env.DATABASE_URL;

// // const connectionString = "postgres://vertex:vertex@localhost:5432/learn_node_postgres";

//   const db = new pg.Pool({ connectionString });
//   // db.query("SELECT * FROM VOLUNTEERS").then((result) => console.log(result));
//   module.exports = db;




const client = new pg({
  user: 'nnqiiglg',
  host: 'tiny.db.elephantsql.com',
  database: 'nnqiiglg',
  password: 'Xk67xtTwRVogvRqJJ44fqez8RB4TJMhI',
  port: 5432,

});

client.connect();


// client.query('SELECT * FROM mytable', (err, res) => {
//   console.log(err ? err.stack : res.rows);
//   client.end();
// });

// query to create database
q = 'CREATE TABLE sensor_data (\
    alcohol_sensor INTEGER CHECK (alcohol_sensor >= 0 AND alcohol_sensor <= 1023),\
    fire_sensor INTEGER CHECK (fire_sensor >= 0 AND fire_sensor <= 1023),\
    latitude INTEGER,\
    longitude INTEGER,\
    gyroscope INTEGER CHECK (gyroscope >= 0 AND gyroscope <= 360)\
  )'

// create database
client.query(q, (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});

// get all the data stored 
client.query('SELECT * FROM sensor_data', (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});

// add data to the database
// q = `INSERT INTO sensor_data (alcohol_sensor, fire_sensor, location, gyroscope) VALUES (512, 800, ST_GeomFromText(\'POINT(10 20)\'), 180);`

// value stored in variables <actual data come from arduino>:
let alcohol_sensor = 512
let fire_sensor = 800
// let location = ST_GeomFromText('POINT(10 20)')
let latitude = 16
let longitude = 15
let gyroscope = 180
q = `INSERT INTO sensor_data (alcohol_sensor, fire_sensor, location, gyroscope) VALUES (${alcohol_sensor}, ${fire_sensor}, ${latitude}, ${longitude}, ${gyroscope});`

client.query(q, (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});





//alcohol_sensor: <intger> range(0-1023)
  //- Fire_SEnsor: integer (0 - 1023)
  //- locaition: latitude, longitude
  //- Zyroscope: 0 to 360