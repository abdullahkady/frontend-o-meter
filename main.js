const esc = require("typhonjs-escomplex");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = fileName => promisify(fs.readFile)(fileName, "utf8");
const recursiveReadDir = require("recursive-readdir");

const rawInputDir = process.argv[2];
const inputDir = path.resolve(rawInputDir);
const main = async () => {
  const files = await recursiveReadDir(inputDir, [
    "node_modules",
    "dist",
    "build",
    ".*",
    "*.env*",
    "*gulp*",
    "config"
  ]);
  css = files
    .filter(file => path.extname(file) === ".css")
    .map(e => path.relative(inputDir, e));
  scss = files
    .filter(file => path.extname(file) === ".scss")
    .map(e => path.relative(inputDir, e));
  html = files
    .filter(file => path.extname(file) === ".html")
    .map(e => path.relative(inputDir, e));
  jsFiles = files
    .filter(file => path.extname(file) === ".js")
    .map(e => path.relative(inputDir, e));
  ts = files
    .filter(file => path.extname(file) === ".ts")
    .map(e => path.relative(inputDir, e));
  const jsMetrics = await Promise.all(
    jsFiles.map(async relativeFileName => {
      const fileName = path.join(inputDir, relativeFileName);
      const sourceCode = await readFile(fileName);
      const metrics = esc.analyzeModule(sourceCode);

      // ======= Clean up =======
      delete metrics.aggregateAverage;
      delete metrics.settings;
      delete metrics.aggregate.halstead.operands;
      delete metrics.aggregate.halstead.operators;
      delete metrics.methodAverage.halstead.operators;
      delete metrics.methodAverage.halstead.operands;
      delete metrics.methods.forEach(method => {
        delete method.halstead.operands;
        delete method.halstead.operators;

        if (method.name.startsWith("<anon")) {
          method.name = "anon-L" + method.lineStart;
        }
      });
      metrics.dependencies = metrics.dependencies.length;
      // ======= Clean up =======

      const filtered = {
        file: relativeFileName,
        metrics
      };
      return filtered;
    })
  );

  const result = {
    css,
    scss,
    html,
    ts,
    jsMetrics
  };

  fs.writeFileSync("./out.json", JSON.stringify(result));
};
main();

// const formattedOutput = JSON.stringify(
// esc.analyzeModule(src).methods.map(e => ({
// name: e.name,
// cyclomatic: e.cyclomatic,
// cyclomaticDensity: e.cyclomaticDensity,
// sloc: e.sloc
// }))
// );
// fs.writeFileSync("./out.json", JSON.stringify(esc.analyzeModule(src)));
//
