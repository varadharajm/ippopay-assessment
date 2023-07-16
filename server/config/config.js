require("dotenv").config();
const dev = {
  app: {
    port: process.env.PORT || 8000,
  },
  db: {
    url: process.env.DB_URL || "mongodb://127.0.0.1:27017/wep_api",
  },
  taxValue: "0",
};

module.exports = dev;
