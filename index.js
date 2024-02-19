const express = require("express");
const app = express();
const PORT = 3001;
// const cors = require("cors");

// require 是 node.js 的一个全局函数，用于引入模块
const path = require("path");
// resolve 是 path 的一个方法，用于将路径或路径片段的序列解析为绝对路径
const pathToFile = path.resolve("./data.json");
// fs 是 node.js 的一个全局模块，用于操作文件
const fs = require("fs");

// var corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

const getResources = JSON.parse(fs.readFileSync(pathToFile));

app.use(express.json());

app.get("/", (req, res) => {});

app.get("/api/resources", (req, res) => {
  const resources = getResources;
  res.send(resources);
});

app.post("/api/resources", (req, res) => {
  const resources = getResources;
  console.log("Data is received to post endpoint");
  console.log(req.body);
  res.send("Data has been received!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
