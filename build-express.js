#!/usr/bin/env node

/**
 * This script initializes a new Node.js project, installs Express, Nodemon, and customizes the package.json file.
 *
 * Use the command 'node <path-to-script>build-express.js' to execute the script.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const initializeProject = () => {
  // Initialize a new Node.js project
  console.log("Initializing Node.js project...");
  execSync("npm init -y");
};

const installExpress = () => {
  // Install Express dependency
  console.log("Installing Express...");
  execSync("npm install express");
};

const installDependencies = () => {
  // Install Nodemon as a development dependency
  console.log("Installing Nodemon...");
  execSync("npm install nodemon --save-dev");
};

const customizePackageJson = () => {
  console.log(`Customizing package.json...`);

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

  packageJson.scripts = {
    start: "nodemon index.js",
  };

  packageJson.type = "module";

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

const main = () => {
  // Build the application
  initializeProject();
  installExpress();
  installDependencies();
  customizePackageJson();
  console.log("Building Express application...");
  buildExpressApp();
  console.log("Express application built successfully!");
};

// Run the script
main();
