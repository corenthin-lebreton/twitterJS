const mongoose = require("mongoose");
const { connect } = mongoose;
require("dotenv").config();

try {
  const PASSWORD = process.env.PASSWORD;

  connect(
    `mongodb+srv://root:${PASSWORD}@cluster0.hxgucxo.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("connected to mongodb");
  });
  db.on("disconnected", function () {
    console.log("disconnected from mongodb");
  });
} catch (error) {
  console.log(error);
}
