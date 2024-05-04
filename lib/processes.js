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
  const expressAppContent = `
      import express from 'express';
      const app = express();
  
      const PORT = process.env.PORT || 8080;
  
      app.listen(PORT, () => {
          console.log(\`Server is running on port \${PORT}\`);
        });
      `;

  fs.writeFileSync("index.js", expressAppContent);
};

const processes = {
  initializeNode,
  installDependencies,
  customizePackageJson,
  buildExpressApp,
};

module.exports = processes;
