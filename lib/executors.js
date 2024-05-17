const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const executors = {
  terminal: (command) => {
    if (!isNonEmptyString(command)) {
      throw new Error("Invalid command");
    }
    execSync(command, { stdio: "inherit" });
  },

  createDir: (dirPath) => {
    if (!isNonEmptyString(dirPath)) {
      throw new Error("Invalid directory name");
    }
    fs.mkdirSync(dirPath);
  },

  writeFile: (filePath, content) => {
    if (!isNonEmptyString(filePath) || !isNonEmptyString(content)) {
      throw new Error("Invalid file path or content");
    }
    fs.writeFileSync(filePath, content);
  },

  readFile: (path) => {
    if (!isNonEmptyString(path)) {
      throw new Error("Invalid path name");
    }

    const projectPath = path.dirname(__dirname);
    const resolvedPath = path.resolve(projectPath + path);
    const fileData = fs.readFileSync(resolvedPath, "utf8");
    return fileData;
  },
};

const isNonEmptyString = (value) => {
  return typeof value === "string" && value !== "";
};

module.exports = executors;
