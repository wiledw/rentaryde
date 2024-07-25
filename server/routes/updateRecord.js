const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig.js');

const router = express.Router();

// updating specific record on the databse given tablename and primarykey
router
    .route("/:tablename/:recordId")
    .patch(async (req, res) => {
        try {
        const { tablename, recordId } = req.params;
        const data = req.body
        const setClause = Object.entries(data).map(([key, value]) => {
            if (typeof value === 'number' || value.match(/^\(.*\)$/) || (value.startsWith('TO_DATE(') && value.endsWith(')'))) {
                return `${key} = ${value}`; // no quotes for numbers or subqueries
            } else {
                return `${key} = '${value}'`; // wrap other values in single quotes
            }
        }).join(', ');
        
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
            // excute the query to update the table's record.
            const updateQuery = `UPDATE ${tablename} SET ${setClause} WHERE ${primaryKeyColumn} = ${recordId}`;
            await connection.execute(updateQuery);
            connection.commit();
    
            res.status(200).json({ success: true, message: 'Record updated successfully' });

        } finally {
            // Release the connection back to the pool
            await connection.close();
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update record' });
        }
    });


module.exports = router;