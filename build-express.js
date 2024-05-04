#!/usr/bin/env node

/**
 * This script initializes a new Node.js project, installs Express, Nodemon, and customizes the package.json file.
 *
 * Use the command 'node <path-to-script>build-express.js' to execute the script.
 */
const processes = require("./lib/processes");
const handleError = require("./lib/errorHandler");

const dependencies = ["express", "nodemon --save-dev"];

try {
  processes.initializeNode();
  processes.installDependencies(dependencies);

  const scriptsMap = new Map();
  scriptsMap.set("start", "nodemon index.js");

  processes.customizePackageJson(scriptsMap, true);
  processes.buildExpressApp();
} catch (error) {
  handleError(error);
}
