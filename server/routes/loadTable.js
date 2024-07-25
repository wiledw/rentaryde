const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();

// load a specific table based on tablename
router
    .route("/:tablename")
    .get(async (req, res) => {
        try {
            const { tablename } = req.params; 
            
            const connection = await oracledb.getConnection(dbconfig);
            // check if table exist
            const tableExistsQuery = `
                SELECT table_name
                FROM user_tables
                WHERE table_name = '${tablename.toUpperCase()}'
            `;
            
            const tableExistsResult = await connection.execute(tableExistsQuery);

            if (tableExistsResult.rows.length === 0) {
                // Table not found
                res.status(404).json({ error: 'Table not found' });
                return;
            }
            // if exist, execute the query for loading that table.
            const result = await connection.execute(`SELECT * FROM ${tablename}`);
        
            const headers = result.metaData.map(column => column.name);
            const rows = result.rows;
            // send back to the frontend the table headers and rows.
            res.json({ headers, rows });
            await connection.close();
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } 
    });

    

module.exports = router;