const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("WORKING");
});

// VERY IMPORTANT: Railway injects process.env.PORT. 
const PORT = process.env.PORT || 8080;

// Railway recommends binding to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`SERVER IS SUCCESSFULLY RUNNING DIRECTLY ON NODE PORT ${PORT}`);
});
