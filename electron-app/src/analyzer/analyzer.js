const jsAnalyzer = require('typhonjs-escomplex');
const CssAnalyzer = require('analyze-css');

const analyzeJS = sourceCode => {
  const metrics = jsAnalyzer.analyzeModule(sourceCode);

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
