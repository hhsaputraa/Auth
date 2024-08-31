import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("test asd");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
