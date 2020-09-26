const fs = require("fs");
const { exec } = require("child_process");

module.exports = () => ({
  clean: () => {
    fs.rmdirSync("./node_modules", { recursive: true });
    fs.rmdirSync("./package-lock.json", { recursive: true });
  },
  update: (packages) =>
    Promise.all(
      Object.keys(packages).map(
        (pkg) =>
          new Promise((resolve, reject) =>
            exec(
              `npm install ${pkg}@${packages[pkg].latest}`,
              (err, stdout) => {
                console.log(stdout);
                resolve();
              }
            )
          )
      )
    ),
  finalize: () =>
    new Promise((resolve, reject) =>
      exec(`npm install`, (err, stdout) => {
        console.log(stdout);
        resolve();
      })
    ),
});
