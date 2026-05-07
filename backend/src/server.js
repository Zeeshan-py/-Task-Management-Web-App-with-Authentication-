const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("WORKING");
});

const PORT = process.env.PORT || 3000;

console.log("ENV PORT:", process.env.PORT);
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});
