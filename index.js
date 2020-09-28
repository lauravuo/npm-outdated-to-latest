#!/usr/bin/env node

const { exec } = require("child_process");
const { preview } = require("./src/previewer")();
const { clean, update, finalize } = require("./src/executor")();

const readline = require("readline");

(async () => {
  const packages = await preview();
  if (packages) {
    clean();
    await update(packages);
    await finalize();
  } else {
    console.log("No updateable packages found, skipping update.");
  }
  process.exit(0);
})();
