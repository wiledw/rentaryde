//establish connection to the Oracle database
const config = {
  user: process.env.NODE_ORACLEDB_USER || "your_username",
  password: process.env.NODE_ORACLEDB_PASSWORD || "your_password",
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=oracle12c.scs.ryerson.ca)(Port=1521))(CONNECT_DATA=(SID=orcl12c)))",
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

module.exports = config;
