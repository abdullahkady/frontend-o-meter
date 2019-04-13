/*
  Maps the display name (key) to the property path in the response object
*/
const FILE_METHODS_BASE_OPTIONS = {
  'Cyclomatic Complexity': 'cyclomatic',
  'Cyclomatic Density': 'cyclomaticDensity',
  'Halstead Bugs': 'halstead.bugs',
  'Halstead Difficulty': 'halstead.difficulty',
  'Halstead Effort': 'halstead.effort',
  'Halstead Length': 'halstead.length',
  'Halstead Time': 'halstead.time',
  'Halstead Volume': 'halstead.volume',
  'Halstead Vocabulary': 'halstead.vocabulary'
};

export const FILE_METHODS_METRICS_SORT_OPTIONS = {
  ...FILE_METHODS_BASE_OPTIONS,
  'Function Name': 'name',
  'Arguments/Parameters count': 'paramCount',
  'Lines Of Code': 'sloc.logical'
};

export const FILE_METHODS_METRICS = {
  ...FILE_METHODS_BASE_OPTIONS,
  'Start Line': 'lineStart'
};

export const FILE_SORT_CHOICES = {
  'Cyclomatic Complexity': 'aggregate.cyclomatic',
  'Cyclomatic Density': 'aggregate.cyclomaticDensity',
  'Halstead Bugs': 'aggregate.halstead.bugs',
  'Halstead Difficulty': 'aggregate.halstead.difficulty',
  'Halstead Effort': 'aggregate.halstead.effort',
  'Halstead Length': 'aggregate.halstead.length',
  'Halstead Time': 'aggregate.halstead.time',
  'Average Function Argument Count': 'methodAverage.paramCount',
  'Lines of Code(logical)': 'aggregate.sloc.logical',
  'Maintainability Index': 'maintainability'
};
