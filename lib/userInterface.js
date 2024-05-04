const readline = require("readline");

const cliInput = (input, func) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(input, (answer) => {
    func(answer);
    rl.close();
  });
};

module.exports = cliInput;
