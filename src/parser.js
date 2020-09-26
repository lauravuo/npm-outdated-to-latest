const gt = require("semver/functions/gt");

const START_STRING = "Package";

module.exports = () => ({
  parse: (data) => {
    const lines = data.split("\n");
    const startIndex = lines.findIndex((item) => item.startsWith(START_STRING));
    const noExtraStartLines = lines.slice(startIndex + 1);
    const endIndex = noExtraStartLines.findIndex((item) => item.trim() === "");
    const dataRows =
      endIndex >= 0 ? noExtraStartLines.slice(0, endIndex) : noExtraStartLines;
    const parsed = dataRows.reduce((result, item) => {
      const words = item.split(" ").filter((item) => item);
      if (words.length === 5) {
        const current = words[1];
        const latest = words[3];
        if (gt(latest, current)) {
          return {
            ...result,
            [words[0]]: {
              current,
              wanted: words[2],
              latest,
            },
          };
        }
      }
      return result;
    }, {});
    if (!Object.keys(parsed).length) {
      console.warn("Parsing result is empty. Check input.");
      return null;
    }
    return parsed;
  },
});
