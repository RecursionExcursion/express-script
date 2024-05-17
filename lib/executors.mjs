import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const executors = {
  terminal: (/** @type {string} */ command) => {
    if (!isNonEmptyString(command)) {
      throw new Error("Invalid command");
    }
    execSync(command, { stdio: "inherit" });
  },

  createDir: (/** @type {string} */ dirPath) => {
    if (!isNonEmptyString(dirPath)) {
      throw new Error("Invalid directory name");
    }
    fs.mkdirSync(dirPath);
  },

  writeFile: (
    /** @type {string} */ filePath,
    /** @type {string} */ content
  ) => {
    if (!isNonEmptyString(filePath) || !isNonEmptyString(content)) {
      throw new Error("Invalid file path or content");
    }
    fs.writeFileSync(filePath, content);
  },

  readFile: (/** @type {any} */ filePath) => {
    if (!isNonEmptyString(filePath)) {
      throw new Error("Invalid path name");
    }
    
    const fileData = fs.readFileSync(filePath, "utf8");
    return fileData;
  },
};

const isNonEmptyString = (/** @type {string} */ value) => {
  return typeof value === "string" && value !== "";
};

export default executors;
