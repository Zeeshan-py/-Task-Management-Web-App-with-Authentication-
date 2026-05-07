const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("WORKING");
});

const PORT = process.env.PORT || 3000;

console.log("FULL ENV PORT VALUE:", process.env.PORT);
console.log("ALL ENV KEYS:", Object.keys(process.env));
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});
