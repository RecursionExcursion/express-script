const fs = require("fs");
const path = require("path");

const readFile = (pathString) => {
  const projectPath = path.dirname(__dirname);
  const resolvedPath = path.resolve(projectPath + pathString);
  const fileData = fs.readFileSync(resolvedPath, "utf8");
  return fileData;
};

module.exports = {
  readFile,
};
