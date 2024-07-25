const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();
// Dropping all the tables from the database
router
    .route("/")
    .get(async (req, res) => {
        try {
          const connection = await oracledb.getConnection(dbconfig);

          const dropCustomerTable = `
          DROP TABLE Customer CASCADE CONSTRAINTS
          `;
          const dropEmployeeTable = `
          DROP TABLE Employee CASCADE CONSTRAINTS
          `;
          const dropWarehouseTable = `
          DROP TABLE Warehouse CASCADE CONSTRAINTS
          `;
          const dropRentalTable = `
          DROP TABLE Rental CASCADE CONSTRAINTS
          `;
          const dropVehicleTable = `
          DROP TABLE Vehicle CASCADE CONSTRAINTS
          `;
          const dropPaymentTable = `
          DROP TABLE Pay_Method CASCADE CONSTRAINTS
          `;
          
          // executing all drop tables to the database
          await connection.execute(dropCustomerTable);
          await connection.execute(dropEmployeeTable);
          await connection.execute(dropWarehouseTable);
          await connection.execute(dropRentalTable);
          await connection.execute(dropVehicleTable);
          await connection.execute(dropPaymentTable);

          await connection.close();
          res.json({ message: 'Tables dropped' });
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'table name does not exist' });
        } 
    });

module.exports = router;