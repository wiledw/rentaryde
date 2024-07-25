const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();

// To create all the tables
router
    .route("/")
    .get(async (req, res) => {
        try {
          const connection = await oracledb.getConnection(dbconfig);
          const createCustomerTable = `
            CREATE TABLE Customer (
              C_num INTEGER PRIMARY KEY,
              FirstName VARCHAR2(25) NOT NULL,
              LastName VARCHAR2(25) NOT NULL,
              Email VARCHAR2(25) UNIQUE,
              Phone VARCHAR2(25) UNIQUE,
              Username VARCHAR2(25) UNIQUE,
              Pwd VARCHAR(25) NOT NULL,
              DateOfBirth DATE,
              JoinDate DATE,
              Balance INTEGER NOT NULL CHECK (Balance >= 0),
              CreditScore INTEGER NOT NULL CHECK (CreditScore >= 0),
              CONSTRAINT unique_customer_data UNIQUE (Email, Phone, Username)
            )
          `;
          const createWarehouseTable = `
            CREATE TABLE Warehouse (
              W_num INTEGER PRIMARY KEY,
              Address VARCHAR2(25) DEFAULT (''),
              City VARCHAR2(25) DEFAULT ('Toronto'),
              Postalcode VARCHAR2(25),
              Opening VARCHAR2(25),
              Closing VARCHAR2(25),
              Capacity INTEGER NOT NULL CHECK (Capacity >= 0)
            )
          `;
          const createEmployeeTable = `
            CREATE TABLE Employee (
              E_num INTEGER PRIMARY KEY,
              FirstName VARCHAR2(25) NOT NULL,
              LastName VARCHAR2(25)NOT NULL,
              Email VARCHAR2(30) UNIQUE,
              Phone VARCHAR2(25) UNIQUE,
              Username VARCHAR2(25) UNIQUE,
              Pwd VARCHAR(25) NOT NULL,
              DateOfBirth DATE,
              JoinDate DATE,
              Salary INTEGER NOT NULL,
              Title VARCHAR(25),
              W_Num INTEGER,
              CONSTRAINT fk_employee_location FOREIGN KEY (W_Num) REFERENCES Warehouse(W_Num) ON DELETE CASCADE,
              CONSTRAINT unique_employee_data UNIQUE (Email, Phone, Username)
            )
          `;
          const createVehicleTable = `
            CREATE TABLE Vehicle (
              V_num INTEGER PRIMARY KEY,
              Colour VARCHAR2(25) NOT NULL,
              Make VARCHAR2(25) NOT NULL,
              Model VARCHAR2(25) NOT NULL,
              Availability INTEGER DEFAULT (1) CHECK (Availability = 0 OR Availability = 1), 
              PricePerDay INTEGER NOT NULL CHECK (PricePerDay > 0),
              EngineType VARCHAR(50),
              SeatCount INTEGER CHECK (SeatCount >= 2),
              CostOfAcquisition INTEGER,
              WeightCapacityKG INTEGER,
              LifetimeExpenses INTEGER,
              W_num INTEGER,
              CONSTRAINT fk_vehicle_warehouse FOREIGN KEY (W_num) REFERENCES Warehouse(W_num)
            ON DELETE CASCADE
            )
          `;
          const createPaymentTable = `
            CREATE TABLE Pay_method (
              Card_Num INTEGER PRIMARY KEY ,
              Expiry DATE,
              CVV VARCHAR2(3) CHECK (LENGTH(CVV) = 3),
              C_Num INTEGER,
              CONSTRAINT fk_customer_payment FOREIGN KEY (C_Num) REFERENCES Customer(C_Num) 
                  ON DELETE CASCADE
            )
          `;
          const createRentalTable = `
            CREATE TABLE Rental (
              R_num INTEGER PRIMARY KEY,
              CostPerDay INTEGER NOT NULL CHECK (CostPerDay > 0),
              LateFee INTEGER CHECK (LateFee >= 0),
              StartDate DATE,
              EndDate DATE,
              DaysLate INTEGER DEFAULT (0) CHECK (DaysLate >= 0),
              V_num INTEGER,
              C_num INTEGER,
              CONSTRAINT fk_customer_rental FOREIGN KEY (C_num) REFERENCES customer(C_num)
                    ON DELETE CASCADE,    
              CONSTRAINT fk_vehicle_rental FOREIGN KEY (V_num) REFERENCES vehicle(V_num)
                    ON DELETE CASCADE
            )
          `;
          
          // execute each create table queries
          await connection.execute(createCustomerTable);
          await connection.execute(createWarehouseTable);
          await connection.execute(createEmployeeTable);
          await connection.execute(createVehicleTable);
          await connection.execute(createPaymentTable);
          await connection.execute(createRentalTable);

          await connection.close();
          res.json({ message: 'Tables created' });

          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'table name is already used by an existing object' });
        } 
    });

module.exports = router;