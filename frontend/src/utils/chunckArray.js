export default (inputArray, chunkSize) => {
  const arrayLength = inputArray.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = inputArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
};
