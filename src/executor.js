const fs = require("fs");
const { exec } = require("child_process");

module.exports = () => ({
  clean: () => {
    fs.rmSync("./node_modules", { recursive: true, force: true });
    fs.rmSync("./package-lock.json");
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
