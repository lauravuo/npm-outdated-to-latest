const { exec } = require("child_process");
const readline = require("readline");
const { parse } = require("./parser")();

module.exports = () => ({
  preview: () =>
    new Promise((resolve) => {
      exec("npm outdated", (err, stdout) => {
        if (err) {
          const parsed = parse(stdout);
          if (parsed) {
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
            });

            console.log("Operation will clean modules and update to latest:");
            Object.keys(parsed).map((pkg) => {
              console.log(
                `updating ${pkg} from ${parsed[pkg].current} to ${parsed[pkg].latest}`
              );
            });
            rl.question("\nAre you sure you want to continue? ", (answer) => {
              if (answer == "yes" || answer === "YES" || answer === "y") {
                return resolve(parsed);
              }
              console.log("Update cancelled.");
              process.exit(0);
            });
          } else {
            console.log(err);
          }
        }
      });
    }),
});
