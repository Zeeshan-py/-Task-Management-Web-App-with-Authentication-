const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("WORKING");
});

const PORT = process.env.PORT || 8080;

// Removed "0.0.0.0" because Railway health checks use IPv6
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON ${PORT}`);
});
