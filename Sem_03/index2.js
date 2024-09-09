const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "person.json");

const data = JSON.parse(fs.readFileSync(pathToFile, "utf-8"));

data.age = data.age - 10;
data.city = "Arkhangelsk";

fs.writeFileSync(
  pathToFile,
  JSON.stringify(data, null, 2)
);
