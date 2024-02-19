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
  const resource = req.body;
  resource.createdAt = new Date();
  resource.status = "inactive";
  resource.id = Date.now().toString();
  resources.unshift(resource);
  // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (error) => {
    if (error) {
      return res.status(422).send("Data cannot be stored!");
    }
    return res.send("Data has been received!");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// :id 是一个动态路由参数, /api/resources/21938hkjkwqgf 会被解析为 { id: "21938hkjkwqgf" }
app.get("/api/resources/:id", (req, res) => {
  const resources = getResources;
  // 也可以写成 const id = req.params.id
  const { id } = req.params;
  const resource = resources.find((resource) => resource.id === id);
  res.send(resource);
});
