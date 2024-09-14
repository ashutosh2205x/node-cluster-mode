import express from "express";
const app = express();
const PORT = 8080;
 
app.get("/api/heavy", async (req, res) => {
  let count = 0;
  for (let index = 0; index < 100000000; index++) {
    count++;
  }
  res.send(`The count is ${count}`);
});

app.listen(PORT, () => {
  console.log("server working on ", PORT);
  console.log("worker pid = ", process.pid);
});
