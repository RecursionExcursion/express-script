const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

  scriptsMap.forEach((k, v) => {
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
  const scriptsFolderPath = path.dirname(__dirname)
  const expressIndexPath = path.resolve(scriptsFolderPath + "/files/expressIndex.js");
  const expressIndexText = fs.readFileSync(expressIndexPath, "utf8");
  fs.writeFileSync("index.js", expressIndexText);
};

const createFolders = () => {
  fs.mkdirSync("src");
  fs.writeFileSync(".env", "");

  //.gitignore
  const gitIgnorePath = path.resolve(__dirname + "/git/gitignore.txt");
  const gitIgnoreText = fs.readFileSync(gitIgnorePath, "utf8");
  fs.writeFileSync(".gitignore", gitIgnoreText);
};

const processes = {
  initializeNode,
  createFolders,
  customizePackageJson,
  buildExpressApp,
  installDependencies,
};

module.exports = processes;
