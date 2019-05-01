import React from 'react';
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
  'Arguments/Parameters count': 'paramCount',
  'Lines Of Code': 'sloc.physical',
  ...FILE_METHODS_BASE_OPTIONS
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
  'Lines of Code(physical)': 'aggregate.sloc.physical',
  'Maintainability Index': 'maintainability'
};

// Yes, I'm a lazy person :')

const HALSTEAD_DESC = (
  <React.Fragment>
    Halstead metrics were defined by <em>Maurice Halstead</em> in 1977, these
    metrics are calculated from the numbers of operators and operands in each
    function. <strong>Lower is better</strong>.
    <a
      style={{ marginTop: 10 }}
      className="btn btn-info btn-block"
      href="https://en.wikipedia.org/wiki/Halstead_complexity_measures"
    >
      LEARN MORE
    </a>
  </React.Fragment>
);

export const FILE_METRICS_DESCRIPTION = {
  'Cyclomatic Complexity': (
    <React.Fragment>
      Defined by <em>Thomas J. McCabe, 1976</em>, this is a count of the number
      of cycles in the program flow control graph. Effectively the number of
      distinct paths through a block of code. <strong>Lower is better</strong>.
      <a
        style={{ marginTop: 10 }}
        className="btn btn-info btn-block"
        href="https://en.wikipedia.org/wiki/Cyclomatic_complexity"
      >
        LEARN MORE
      </a>
    </React.Fragment>
  ),
  'Cyclomatic Density': (
    <React.Fragment>
      Proposed as a modification to cyclomatic complexity by{' '}
      <em>Geoffrey K. Gill and Chris F. Kemerer</em> in 1991, this metric simply
      re-expresses it as a percentage of the logical lines of code.{' '}
      <strong>Lower is better</strong>.
    </React.Fragment>
  ),
  'Halstead Bugs': HALSTEAD_DESC,
  'Halstead Difficulty': HALSTEAD_DESC,
  'Halstead Effort': HALSTEAD_DESC,
  'Halstead Length': HALSTEAD_DESC,
  'Halstead Time': HALSTEAD_DESC,
  'Average Function Argument Count': (
    <React.Fragment>
      Analyzed statically from the function signature, so no accounting is made
      for functions that rely on dynamic arguments (same as spreading).
    </React.Fragment>
  ),
  'Lines of Code(physical)': (
    <React.Fragment>
      Physical lines (the number of lines in a module or function).
    </React.Fragment>
  ),
  'Maintainability Index': (
    <React.Fragment>
      Introduced by <em>Paul Oman and Jack Hagemeister, 1991</em>, values are on
      a logarithmic scale ranging from negative infinity up to 171,{' '}
      <strong>Higher is better</strong>.
    </React.Fragment>
  )
};
