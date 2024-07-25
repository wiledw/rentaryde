const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();

router
    .route("/:tablename")
    .post(async (req, res) => {
        let connection;
        try {
            const { tablename } = req.params; 
            const data = req.body
            connection = await oracledb.getConnection(dbconfig);
            const columns = Object.keys(data).join(', ');
            const values = Object.values(data).map(value => {
                if (typeof value === 'number' || value.match(/^\(.*\)$/)) {
                    return value; // no quotes for numbers or subqueries
                } else if (value.startsWith('TO_DATE(') && value.endsWith(')')) {
                    return value; // no quotes for TO_DATE functions
                } else {
                    return `'${value}'`; // wrap other values in single quotes
                }
            }).join(', ');
            
            const addRecord = `INSERT INTO ${tablename} (${columns}) VALUES (${values})`;
            await connection.execute(addRecord); // execute the adding Record query to a specifc table based on ${tablename}
            connection.commit();          
            res.json({ message: '1 row added' });

        } catch (error) {
            console.error(error);
            res.status(400).json({ success: false, message: 'Fail to add row! Check for unique constraint.' });
        } finally {
            if (connection) {
              try {
                await connection.close();
              } catch (err) {
                console.error(err);
              }
            }
        }
    });


module.exports = router;