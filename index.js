// npm i express mysql2 ejs body-parser
const express = require('express');
const port = 7575;
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");

const path = require('path');
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

var db_M = require('./database');
global.db_pool = db_M.pool;

//yanal
const emp_rtr = require('./routes/employees_R');
app.use('/', emp_rtr);

const time_clock_rtr = require('./routes/time_clock');
app.use('/time_clock', time_clock_rtr);

const employee_time_rtr = require('./routes/employee_time_R');
app.use('/employee_time', employee_time_rtr);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});






