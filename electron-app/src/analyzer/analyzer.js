const jsAnalyzer = require('typhonjs-escomplex');
const CssAnalyzer = require('analyze-css');

const analyzeJS = sourceCode => {
  const metrics = jsAnalyzer.analyzeModule(sourceCode);

  // ======= Clean up =======
  delete metrics.aggregateAverage;
  delete metrics.settings;
  metrics.methods.forEach(method => {
    if (method.name.startsWith('<anon')) {
      method.name = `anon-L${method.lineStart}`;
    }
  });
  metrics.dependencies = metrics.dependencies.length;
  // ======= Clean up =======

  return metrics;
};

const analyzeCSS = sourceCode =>
  new Promise((res, rej) => {
    new CssAnalyzer(sourceCode, (err, result) => {
      if (err) return rej(err);
      delete result.generator;
      delete result.metrics.oldIEFixes;
      delete result.metrics.notMinified;
      delete result.metrics.qualifiedSelectors;
      delete result.metrics.length;
      return res(result);
    });
  });

module.exports = {
  analyzeCSS,
  analyzeJS
};
