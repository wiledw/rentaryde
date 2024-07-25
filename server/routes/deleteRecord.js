const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();


router
    .route("/:tablename/:recordId")
    .delete(async (req, res) => {
        try {
        const { tablename, recordId } = req.params;

        // Get connection from the connection pool
        const connection = await oracledb.getConnection(dbconfig);

        try {
            // Use describe method to get information about the table
            const result = await connection.execute(
            `
            SELECT cols.table_name, cols.column_name, cols.position, cons.status, cons.owner
            FROM all_constraints cons, all_cons_columns cols
            WHERE cols.table_name = '${tablename.toUpperCase()}'
            AND cons.constraint_type = 'P'
            AND cons.constraint_name = cols.constraint_name
            AND cons.owner = cols.owner
            ORDER BY cols.table_name, cols.position
            `);

            if (result.rows.length === 0) {
            return res.status(500).json({ success: false, message: 'Table does not have a primary key' });
            }

            const primaryKeyColumn = result.rows[0][1];

            // Now you can use primaryKeyColumn to identify the primary key name
             //execute the delete query to the database based on ${tablename}
            await connection.execute(`DELETE FROM ${tablename} WHERE ${primaryKeyColumn} = ${recordId}`);
            connection.commit();
            res.status(200).json({ success: true, message: 'Record deleted successfully' });

        } finally {
            // Release the connection back to the pool
            await connection.close();
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete record' });
        }
    });


module.exports = router;