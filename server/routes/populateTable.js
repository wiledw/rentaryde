const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();
// populate all the tables
router
    .route("/")
    .get(async (req, res) => {
        try {
          const connection = await oracledb.getConnection(dbconfig);
          const populateCustomerTable = `
            INSERT ALL
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore) 
                    VALUES (1, 'John', 'Doe', 'johndoe@example.com', '555-123-4567', 'johndoe123', 'password123', TO_DATE('1990-01-15', 'YYYY-MM-DD'), TO_DATE('2023-09-22', 'YYYY-MM-DD'), 1000, 750)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore) 
                    VALUES (2, 'Jane', 'Smith', 'janesmith@example.com', '555-987-6543', 'janesmith789', 'securepassword', TO_DATE('1985-03-20', 'YYYY-MM-DD'), TO_DATE('2023-09-25', 'YYYY-MM-DD'), 1500, 800)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (3, 'David', 'Johnson', 'davidjohnson@example.com', '555-555-5555', 'davidjohndoe', 'strongpassword', TO_DATE('1978-12-10', 'YYYY-MM-DD'), TO_DATE('2023-09-28', 'YYYY-MM-DD'), 2000, 700)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore) 
                    VALUES (4, 'Sarah', 'Brown', 'sarahbrown@example.com', '555-333-2222', 'sarahb123', 'password456', TO_DATE('1995-05-12', 'YYYY-MM-DD'), TO_DATE('2023-10-01', 'YYYY-MM-DD'), 800, 850)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (5, 'Amanda', 'Wilson', 'amandawilson@example.com', '555-777-8888', 'amandawilson321', 'mypassword321', TO_DATE('1993-07-08', 'YYYY-MM-DD'), TO_DATE('2023-10-05', 'YYYY-MM-DD'), 1200, 720)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (6, 'Michael', 'Davis', 'michaeldavis@example.com', '555-444-9999', 'mikedavis456', 'mypass456', TO_DATE('1987-11-25', 'YYYY-MM-DD'), TO_DATE('2023-10-10', 'YYYY-MM-DD'), 1800, 690)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (7, 'Emily', 'Anderson', 'emilyanderson@example.com', '555-123-7890', 'emilya789', 'emilypassword', TO_DATE('1998-04-14', 'YYYY-MM-DD'), TO_DATE('2023-10-15', 'YYYY-MM-DD'), 1600, 780)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (8, 'David', 'Martinez', 'davidmartinez@example.com', '555-222-1111', 'danmartinez', 'securepass789', TO_DATE('1992-06-30', 'YYYY-MM-DD'), TO_DATE('2023-10-20', 'YYYY-MM-DD'), 2200, 700)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (9, 'Olivia', 'Garcia', 'oliviagarcia@example.com', '555-666-3333', 'oliviag', 'myoliviapassword', TO_DATE('1997-02-12', 'YYYY-MM-DD'), TO_DATE('2023-10-25', 'YYYY-MM-DD'), 1900, 750)
                INTO Customer (C_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Balance, CreditScore)
                    VALUES (10, 'William', 'Clark', 'williamclark@example.com', '555-999-7777', 'williamc123', 'passwilliam', TO_DATE('1980-09-05', 'YYYY-MM-DD'), TO_DATE('2023-10-30', 'YYYY-MM-DD'), 2500, 800)
            SELECT 1 FROM DUAL
          `;
          const populateWarehouseTable = `
            INSERT ALL
                INTO Warehouse (W_num, Address, City, Postalcode, Opening, Closing, Capacity) 
                    VALUES (1, '459 Western St.', 'Oshawa', 'M9V2T6', '08:00 AM', '05:00 PM', 3)
                INTO Warehouse (W_num, Address, City, Postalcode, Opening, Closing, Capacity) 
                    VALUES (2, '421 Main St.', 'Vaughan', 'M4K7G9', '08:00 AM', '09:00 PM', 5)
                INTO Warehouse (W_num, Address, City, Postalcode, Opening, Closing, Capacity)
                    VALUES (3, '892 Queen St. East', 'Toronto', 'M4K2J3', '10:00 AM', '10:00 PM', 10)
                INTO Warehouse (W_num, Address, City, Postalcode, Opening, Closing, Capacity) 
                    VALUES (4, '349 Yonge St.', 'Toronto', 'M4T2T1', '11:00 AM', '10:00 PM', 20)
                INTO Warehouse (W_num, Address, City, Postalcode, Opening, Closing, Capacity)
                    VALUES (5, '1248 Franklin Ave.', 'Kitchener', 'M8G2B4', '07:00 AM', '09:00 PM', 2)
            SELECT 1 FROM DUAL
          `;
          const populateEmployeeTable = `
            INSERT ALL
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num) 
                    VALUES (101, 'Russell', 'Doe', 'russelldoe@example.com', '555-123-4567', 'russelldoe123', 'pwd123', TO_DATE('1990-01-15', 'YYYY-MM-DD'), TO_DATE('2023-09-22', 'YYYY-MM-DD'), 75000, 'Software Engineer', 1)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num) 
                    VALUES (102, 'Emily', 'Smith', 'emilysmith@example.com', '555-987-6543', 'emilysmith789', 'securepassword', TO_DATE('1985-03-20', 'YYYY-MM-DD'), TO_DATE('2023-09-25', 'YYYY-MM-DD'), 80000, 'Data Analyst', 1)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (103, 'Matthew', 'Johnson', 'matthewjohnson@example.com', '555-555-5555', 'mattjohn123', 'strongpassword', TO_DATE('1978-12-10', 'YYYY-MM-DD'), TO_DATE('2023-09-28', 'YYYY-MM-DD'), 90000, 'Product Manager', 2)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num) 
                    VALUES (104, 'Sophia', 'Brown', 'sophiabrown@example.com', '555-333-2222', 'sophiab123', 'password456', TO_DATE('1995-05-12', 'YYYY-MM-DD'), TO_DATE('2023-10-01', 'YYYY-MM-DD'), 70000, 'UI/UX Designer', 2)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (105, 'Liam', 'Davis', 'liamdavis@example.com', '555-777-8888', 'liamdavis321', 'mypassword321', TO_DATE('1993-07-08', 'YYYY-MM-DD'), TO_DATE('2023-10-05', 'YYYY-MM-DD'), 85000, 'Software Engineer', 3)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (106, 'Olivia', 'Wilson', 'oliviawilson@example.com', '555-444-9999', 'oliviawilson456', 'mypass456', TO_DATE('1987-11-25', 'YYYY-MM-DD'), TO_DATE('2023-10-10', 'YYYY-MM-DD'), 92000, 'Data Analyst', 4)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (107, 'James', 'Clark', 'jamesclark@example.com', '555-123-7890', 'jamesc789', 'jamespassword', TO_DATE('1998-04-14', 'YYYY-MM-DD'), TO_DATE('2023-10-15', 'YYYY-MM-DD'), 88000, 'Product Manager', 5)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (108, 'Ava', 'Garcia', 'avagarcia@example.com', '555-222-1111', 'avag', 'avapassword789', TO_DATE('1992-06-30', 'YYYY-MM-DD'), TO_DATE('2023-10-20', 'YYYY-MM-DD'), 87000, 'UI/UX Designer', 5)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (109, 'Mia', 'Martinez', 'miamartinez@example.com', '555-666-3333', 'miamartinez123', 'miapassword', TO_DATE('1997-02-12', 'YYYY-MM-DD'), TO_DATE('2023-10-25', 'YYYY-MM-DD'), 86000, 'Software Engineer', 3)
                INTO Employee (E_num, FirstName, LastName, Email, Phone, Username, Pwd, DateOfBirth, JoinDate, Salary, Title, W_Num)
                    VALUES (110, 'Noah', 'Anderson', 'noahanderson@example.com', '555-999-7777', 'noaha123', 'noahpassword', TO_DATE('1980-09-05', 'YYYY-MM-DD'), TO_DATE('2023-10-30', 'YYYY-MM-DD'), 92000, 'Data Analyst', 2)
            SELECT 1 FROM DUAL
          `;
          const populateVehicleTable = `
            INSERT ALL
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num) 
                    VALUES (6000, 'Red', 'Toyota', 'Camry', 1, 50, 'Gasoline', 5, 20000, 1000, 5000, 1)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num) 
                    VALUES (6001, 'Blue', 'Ford', 'Fusion', 1, 55, 'Gasoline', 5, 21000, 1100, 5500, 1)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6002, 'Silver', 'Honda', 'Civic', 1, 48, 'Gasoline', 5, 19000, 1050, 5200, 2)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num) 
                    VALUES (6003, 'Black', 'Nissan', 'Altima', 1, 53, 'Gasoline', 5, 22000, 1150, 5700, 3)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6004, 'White', 'Chevrolet', 'Malibu', 1, 49, 'Gasoline', 5, 20000, 1050, 5100, 4)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6005, 'Green', 'Kia', 'Optima', 1, 52, 'Gasoline', 5, 21000, 1100, 5500, 5)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6006, 'Red', 'Toyota', 'RAV4', 0, 60, 'Gasoline', 5, 23000, 1200, 6000, 1)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6007, 'Blue', 'Ford', 'Escape', 0, 65, 'Gasoline', 5, 24000, 1250, 6500, 3)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6008, 'Silver', 'Honda', 'CR-V', 0, 70, 'Gasoline', 5, 25000, 1300, 7000, 2)
                INTO Vehicle (V_num, Colour, Make, Model, Availability, PricePerDay, EngineType, SeatCount, CostOfAcquisition, WeightCapacityKG, LifetimeExpenses, W_num)
                    VALUES (6009, 'Black', 'Nissan', 'Rogue', 0, 75, 'Gasoline', 5, 26000, 1350, 7500, 4)
            SELECT 1 FROM DUAL
          `;
          const populatePaymentTable = `
            INSERT ALL
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('1111222233334444', TO_DATE('2024-10-01', 'YYYY-MM-DD'), '123', 1)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('2222333344445555', TO_DATE('2025-11-01', 'YYYY-MM-DD'), '234', 2)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('3333444455556666', TO_DATE('2023-12-01', 'YYYY-MM-DD'), '345', 2)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('4444555566667777', TO_DATE('2022-09-01', 'YYYY-MM-DD'), '456', 3)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('5555666677778888', TO_DATE('2026-08-01', 'YYYY-MM-DD'), '567', 4)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('6666777788889999', TO_DATE('2023-07-01', 'YYYY-MM-DD'), '678', 4)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('7777888899990000', TO_DATE('2024-06-01', 'YYYY-MM-DD'), '789', 4)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('8888999900001111', TO_DATE('2025-05-01', 'YYYY-MM-DD'), '890', 8)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('9999000011112222', TO_DATE('2022-04-01', 'YYYY-MM-DD'), '901', 3)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('1237467890123456', TO_DATE('2023-03-01', 'YYYY-MM-DD'), '012', 7)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('2345678901234567', TO_DATE('2024-02-01', 'YYYY-MM-DD'), '123', 7)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('3456789012345678', TO_DATE('2025-01-01', 'YYYY-MM-DD'), '234', 8)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('4567890123456789', TO_DATE('2026-12-01', 'YYYY-MM-DD'), '345', 10)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('5678901234567890', TO_DATE('2022-11-01', 'YYYY-MM-DD'), '456', 10)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('6789012345678901', TO_DATE('2023-10-01', 'YYYY-MM-DD'), '567', 9)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('7890123456789012', TO_DATE('2024-09-01', 'YYYY-MM-DD'), '678', 9)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('8901234567890123', TO_DATE('2025-08-01', 'YYYY-MM-DD'), '789', 6)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('9012345678901234', TO_DATE('2026-07-01', 'YYYY-MM-DD'), '890', 6)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('0123456789012345', TO_DATE('2023-06-01', 'YYYY-MM-DD'), '901', 6)
                INTO Pay_method (Card_Num, Expiry, CVV, C_Num) VALUES ('3456345634512356', TO_DATE('2024-05-01', 'YYYY-MM-DD'), '012', 6)
            SELECT 1 FROM DUAL
          `;
          const populateRentalTable = `
            INSERT ALL
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (1, 50, 10, TO_DATE('2023-09-22', 'YYYY-MM-DD'), TO_DATE('2023-09-27', 'YYYY-MM-DD'), 0, 1, 6000)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (2, 55, 15, TO_DATE('2023-09-25', 'YYYY-MM-DD'), TO_DATE('2023-09-30', 'YYYY-MM-DD'), 0, 2, 6001)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (3, 48, 8, TO_DATE('2023-09-28', 'YYYY-MM-DD'), TO_DATE('2023-10-03', 'YYYY-MM-DD'), 0, 3, 6002)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (4, 53, 10, TO_DATE('2023-10-01', 'YYYY-MM-DD'), TO_DATE('2023-10-06', 'YYYY-MM-DD'), 0, 4, 6003)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (5, 49, 9, TO_DATE('2023-10-05', 'YYYY-MM-DD'), TO_DATE('2023-10-10', 'YYYY-MM-DD'), 0, 5, 6004)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (6, 52, 7, TO_DATE('2023-10-10', 'YYYY-MM-DD'), TO_DATE('2023-10-15', 'YYYY-MM-DD'), 0, 6, 6005)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (7, 60, 12, TO_DATE('2023-10-15', 'YYYY-MM-DD'), TO_DATE('2023-12-21', 'YYYY-MM-DD'), 0, 7, 6006)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (8, 65, 13, TO_DATE('2023-10-20', 'YYYY-MM-DD'), TO_DATE('2023-12-25', 'YYYY-MM-DD'), 0, 8, 6007)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (9, 70, 14, TO_DATE('2023-10-25', 'YYYY-MM-DD'), TO_DATE('2023-12-20', 'YYYY-MM-DD'), 0, 9, 6008)
                INTO Rental (R_num, CostPerDay, LateFee, StartDate, EndDate, DaysLate, C_num, V_num) VALUES (10, 75, 15, TO_DATE('2023-10-30', 'YYYY-MM-DD'), TO_DATE('2023-12-04', 'YYYY-MM-DD'), 0, 10, 6009)
            SELECT 1 FROM DUAL
          `;
            // execute all the query to populate the tables to the database.
          await connection.execute(populateCustomerTable);
          await connection.execute(populateWarehouseTable);
          await connection.execute(populateEmployeeTable);
          await connection.execute(populateVehicleTable);
          await connection.execute(populatePaymentTable);
          await connection.execute(populateRentalTable);

          connection.commit();
          await connection.close();
          
          res.json({ message: 'Tables populated' });

          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Tables are already populated with default dummy records!' });
        } 
    });


module.exports = router;