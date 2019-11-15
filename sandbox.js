function memo(fn) {
  const cache = Object.create(null);

  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

function sum(x, y) {
  console.log("sum");
  return x + y;
}

const memoSum = memo(sum);

console.log(memoSum(3, 6));
console.log(memoSum(3, 7));
console.log(memoSum(3, 6));
