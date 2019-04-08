import getNestedProperty from 'lodash/get';

export default (
  files,
  filterOptionObjectPath,
  filterValue,
  isGreaterThan = true
) =>
  files.filter(file => {
    const metricValue = getNestedProperty(file.metrics, filterOptionObjectPath);
    const operator = isGreaterThan ? '>' : '<';
    // eslint-disable-next-line no-eval
    return eval(`(${metricValue}${operator}${filterValue})`);
  });
