const path = require("path");
const fs = require("fs");

const handleError = (error) => {
  console.log(error.message);
  clearFolder();
  // Handle error
};

const clearFolder = () => {
  console.log("Clearing folder...");
  const currentPath = path.resolve(".");
  fs.readdirSync(currentPath).forEach((file) => {
    fs.unlinkSync(file);
  });
  console.log("Folder cleared.");
};

module.exports = handleError;
