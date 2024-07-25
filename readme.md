Rent-A-Ryde Car Rental Service System User Guide

Client folder contains all front-end files. (HTML, CSS, JavaScript)
Server folder contains all back-end files. (NodeJS, ExpressJS, OracleDB)

Before getting started, you need to setup the connection between the back-end and the database.
Go to the server folder and look-up for dbconfig.js, which will look like this:

const config = {
    user: process.env.NODE_ORACLEDB_USER || "your_username",
    password: process.env.NODE_ORACLEDB_PASSWORD || "your_password",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))",
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };
  
module.exports = config;

For this project, we are using oracle 12c, so change the username and password into your oracle username and password to establish connection.

Login to your moon server account and put the 'server' folder into your moon server.

Run 'node database.js' in the 'server' directory terminal.
To check if the server is running, it should give: Server is running on http://localhost:3000

After running the server, you can open the HTML files in the client folder and access the database from the user-interface.

Make sure to change all the moonUsername constant in the script body of all html files to your moon username.

Make sure to connect to TMU's CS VPN for making the database connection possible. MobaVPN for windows and Thunnelblick for Mac.

TMU google drive link to download the vpn: https://drive.google.com/drive/u/2/folders/1bcXqOuBQUWLprZeLIXPR19Mw5ouYSKoL
