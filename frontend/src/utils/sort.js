import getNestedProperty from 'lodash/get';

export const sortFiles = (rawFiles, isAscending, sortOptionObjectPath) =>
  rawFiles.sort(
    (f1, f2) =>
      getNestedProperty((isAscending ? f1 : f2).metrics, sortOptionObjectPath) -
      getNestedProperty((isAscending ? f2 : f1).metrics, sortOptionObjectPath)
  );

export const sortMethods = (methods, isAscending, sortPath) =>
  methods.sort(
    (m1, m2) =>
      getNestedProperty(isAscending ? m1 : m2, sortPath) -
      getNestedProperty(isAscending ? m2 : m1, sortPath)
  );
