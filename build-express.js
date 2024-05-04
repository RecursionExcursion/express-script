#!/usr/bin/env node

/**
 * This script initializes a new Node.js project, installs Express, Nodemon, and customizes the package.json file.
 *
 * Use the command 'node <path-to-script>build-express.js' to execute the script.
 */
const operators = require("./lib/operators");
const handleError = require("./lib/errorHandler");

const dependencies = ["express", "nodemon --save-dev"];

try {
  operators.initializeNode();
  operators.installDependencies(dependencies);

  const scriptsMap = new Map();
  scriptsMap.set("start", "nodemon index.js");

  operators.customizePackageJson(scriptsMap, true);
  operators.buildExpressApp();
} catch (error) {
  handleError(error);
}
