const express = require("express");
require("dotenv").config({
  path: "C:/Users/coren/Desktop/ApiProject/src/Database/.env",
});
const usersRouter = require("./routes/users.route");
const tweetsRouter = require("./routes/tweets.route");
require("../src/Database/database");
const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/", usersRouter);
app.use("/", tweetsRouter);
