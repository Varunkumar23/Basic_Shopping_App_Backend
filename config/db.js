const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "day16",
  })
  .then(() => {
    console.log("Database is Connected Successfully ✅");
  })
  .catch((err) => {
    console.log("Database Connection Error ❌", err.message);
  });
