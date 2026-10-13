const sleep = (ms = Math.random() * 3000) =>
    new Promise(resolve => setTimeout(resolve, ms));

export { sleep };
