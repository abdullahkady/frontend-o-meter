export default ({ from, to }) => {
  return new Promise(resolve => {
    const maximum = to * 1000;
    const minimum = from * 1000;
    const delay = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
