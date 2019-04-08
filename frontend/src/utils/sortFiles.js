import getNestedProperty from 'lodash/get';

export default (rawFiles, isAscending, sortOptionObjectPath) =>
  rawFiles.sort(
    (f1, f2) =>
      getNestedProperty((isAscending ? f1 : f2).metrics, sortOptionObjectPath) -
      getNestedProperty((isAscending ? f2 : f1).metrics, sortOptionObjectPath)
  );
