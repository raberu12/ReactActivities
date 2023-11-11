const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const cors = require("cors");

app.use(express.json());
app.use(cors());

const userList = [
  { id: 1, name: "Patrick", age: 27 },
  { id: 2, name: "Gran", age: 28 },
  { id: 3, name: "Ean", age: 29 },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/users", (req, res) => {
  res.send(userList);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userList.find((u) => u.id === userId);

  if(user){
    res.json(user);
  }else{
    res.status(404).json({message: "user not found"});
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`App has been updated`);
});