const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

const loadTable = require('./routes/loadTable.js');
const createTable = require('./routes/createTable.js');
const dropTable = require('./routes/dropTable.js');
const populateTable = require('./routes/populateTable.js');

const addRecord = require('./routes/addRecord.js');
const deleteRecord = require('./routes/deleteRecord.js');
const updateRecord = require('./routes/updateRecord.js');
const query = require('./routes/query.js');

const app = express();
app.use(cors());
app.use(express.json());

// API
//routes (to handle all the http request from the front-end)
app.use("/loadTable", loadTable);
app.use("/createTable", createTable);
app.use("/dropTable", dropTable);
app.use("/populateTable", populateTable);
app.use("/addRecord", addRecord);
app.use("/deleteRecord", deleteRecord);
app.use("/updateRecord", updateRecord);

app.use("/query", query);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});