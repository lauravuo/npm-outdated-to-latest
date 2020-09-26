const { exec } = require("child_process");
const { preview } = require("./src/previewer")();
const { clean, update, finalize } = require("./src/executor")();

const readline = require("readline");

(async () => {
  const packages = await preview();
  if (packages) {
    clean();
  } else {
    console.log("No updateable packages found, skipping update.");
  }
  await update(packages);
  await finalize();
  process.exit(0);
})();
