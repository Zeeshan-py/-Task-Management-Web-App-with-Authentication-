const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("WORKING");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SERVER STARTED ON ${PORT}`);
});
