#!/usr/bin/env node

/**
 * This script initializes a new Node.js project, installs Express, Nodemon, and customizes the package.json file.
 *
 * Use the command 'node <path-to-script>build-express.js' to execute the script.
 */
const processes = require("./lib/processes");

const dependencies = ["express", "nodemon --save-dev", "dotenv"];
const scriptsMap = new Map([["start", "nodemon index.js"]]);

processes.buildExpressApp();
processes.createFolders();
processes.initializeNode();
processes.customizePackageJson(scriptsMap, true);
processes.installDependencies(dependencies);
console.log("Express app created successfully.");
