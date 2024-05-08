const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { readFile } = require("./util");

const initializeNode = () => {
  console.log("Initializing Node.js...");
  execSync("npm init -y");
};

const installDependencies = (dependencies) => {
  console.log("Installing dependencies...");

  dependencies.forEach((dependency) => {
    console.log(`Installing ${dependency}...`);
    execSync(`npm install ${dependency}`);
  });
};

const customizePackageJson = (scriptsMap, useESModules) => {
  console.log(`Building package.json...`);

  const propertyOrder = [
    "name",
    "version",
    "description",
    "author",
    "license",
    "keywords",
    "main",
    "type",
    "scripts",
    "dependencies",
    "devDependencies",
  ];

  // Read package.json file
  const packageJsonPath = path.resolve("package.json");

  const packageJson = require(packageJsonPath);

  scriptsMap.forEach((v, k) => {
    packageJson.scripts[k] = v;
  });

  packageJson.type = useESModules ? "module" : "commonjs";

  const orderedPackageJson = {};

  propertyOrder.forEach((property) => {
    if (packageJson.hasOwnProperty(property)) {
      orderedPackageJson[property] = packageJson[property];
    }
  });

  // Write the modified package.json back to file
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(orderedPackageJson, null, 2)
  );
};

const buildExpressApp = () => {
  // Create the index.js file content
  const indexContent = readFile("/files/express/expressIndex.js");
  fs.writeFileSync("index.js", indexContent);
};

const createFolders = () => {
  //Models folder
  fs.mkdirSync("src/models", { recursive: true });
  fs.mkdirSync("src/user", { recursive: true });

  //mock models folder
  const fileContent = readFile("/files/express/user.js");
  fs.writeFileSync("src/user/user.js", fileContent);

  //.env file
  fs.writeFileSync(".env", "");

  //.gitignore
  const gitIgnoreContent = readFile("/lib/git/gitignore.txt");
  fs.writeFileSync(".gitignore", gitIgnoreContent);
};

const processes = {
  initializeNode,
  createFolders,
  customizePackageJson,
  buildExpressApp,
  installDependencies,
};

module.exports = processes;
