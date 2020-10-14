module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "bar_test_api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
