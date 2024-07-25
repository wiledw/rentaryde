const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();

// to run the views option to the database.
router
    .route("/:number")
    .get(async (req, res) => {
        try {
            const { number } = req.params; 
            const connection = await oracledb.getConnection(dbconfig);

            const queries = [
                // query0
                `SELECT 
                    w.w_num,
                    w.address,
                    w.city,
                    w.postalcode,
                    COUNT(e.w_num) AS TOTAL_NUMBER_OF_EMPLOYEE
                FROM
                    Warehouse w
                LEFT JOIN
                    Employee e on w.w_num = e.w_num
                GROUP BY w.w_num, w.address, w.city, w.postalcode
                ORDER BY w.w_num`,
                // query1
                `SELECT
                    c.C_Num,
                    Firstname,
                    Lastname,
                    email,
                    balance
                FROM
                    Customer c
                WHERE
                    NOT EXISTS(
                            SELECT
                                p.C_Num,
                                p.Expiry
                            FROM
                                Pay_method p
                            WHERE
                                c.C_num = p.C_num
                                AND SYSDATE < p.Expiry)`,
                // query2
                `SELECT
                    w.w_num,
                    e.e_num,
                    e.firstname,
                    e.lastname,
                    e.phone
                FROM Employee e, Warehouse w
                WHERE w.w_num = e.w_num AND w.w_num = 1
                UNION (
                    SELECT
                        w.w_num,
                        e.e_num,
                        e.firstname,
                        e.lastname,
                        e.phone
                    FROM Employee e, Warehouse w
                    WHERE w.w_num = e.w_num AND w.w_num = 2
                )`,
                // query3
                `SELECT 
                    v_num,
                    colour,
                    make,
                    model,
                    priceperday,
                    seatcount,
                    enginetype,
                    w_num
                 FROM vehicle
                 MINUS(
                    SELECT 
                        v_num,
                        colour,
                        make,
                        model,
                        priceperday,
                        seatcount,
                        enginetype,
                        w_num
                    FROM vehicle
                    WHERE vehicle.availability = 0
                 )`,
                 // query4
                 `SELECT 
                        v_num,
                        colour,
                        make,
                        model,
                        seatcount,
                        w_num
                    FROM vehicle
                    GROUP BY v_num,
                        colour,
                        make,
                        model,
                        seatcount,
                        w_num
                    HAVING seatcount >= 5
                    ORDER BY vehicle.v_num ASC
                 `
            ];
            // check which view number the user wants to execute.
            if (number >= 0 && number < queries.length) {
                const queryToExecute = queries[number];
                const result = await connection.execute(queryToExecute); //execute the view query
                const headers = result.metaData.map(column => column.name);
                const rows = result.rows;
                res.json({ headers, rows });
            } else {
                res.status(400).json({ success: false, message: 'Invalid query number' });
            }

            await connection.close();

          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } 
    });


module.exports = router;