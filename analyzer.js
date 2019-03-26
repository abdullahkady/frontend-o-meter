const jsAnalyzer = require('typhonjs-escomplex');

const analyzeJS = (sourceCode) => {
  const metrics = jsAnalyzer.analyzeModule(sourceCode);

  // ======= Clean up =======
  delete metrics.aggregateAverage;
  delete metrics.settings;
  delete metrics.aggregate.halstead.operands;
  delete metrics.aggregate.halstead.operators;
  delete metrics.methodAverage.halstead.operators;
  delete metrics.methodAverage.halstead.operands;
  delete metrics.methods.forEach((method) => {
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

module.exports = {
  analyzeJS,
};
