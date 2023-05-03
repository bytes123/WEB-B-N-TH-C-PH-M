"use strict";

const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
async function createConnection(
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
) {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });

    console.log("Connected to MySQL");
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  loginDB: async (req, res) => {
    const { host, username, password, database } = req.body;
    console.log(host, username, password, database);
    const isConnected = await createConnection(
      host,
      username,
      password,
      database
    );

    if (isConnected) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  },
  migrate: async (req, res) => {
    const { host, username, password, database } = req.body;

    const mysqlConfig = {
      host: host,
      username: username,
      password: password,
      database: database,
    };

    const sqlserverConfig = {
      host: "localhost",
      username: "sa",
      password: "123456",
      database: "TEST",
      dialect: "mssql",
    };

    try {
      const mysqlConnection = await mysql.createConnection({
        host: mysqlConfig.host,
        user: mysqlConfig.username,
        password: mysqlConfig.password,
        database: mysqlConfig.database,
      });
      const sqlserverConnection = new Sequelize(
        sqlserverConfig.database,
        sqlserverConfig.username,
        sqlserverConfig.password,
        {
          host: sqlserverConfig.host,
          dialect: sqlserverConfig.dialect,
        }
      );

      const [storages] = await mysqlConnection.query("SELECT * FROM storages");

      // Define the models for the SQL Server database
      const Storages = sqlserverConnection.define("storages", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

      // Perform the migration
      // TODO: Replace this with your own migration script
      await sqlserverConnection.sync({ force: true });
      await Storages.bulkCreate(storages);

      res.send("Migration complete!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Migration failed.");
    }
  },
};
