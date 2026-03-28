export function createCounter(init = 0) {
  let current = init;

  function increment() {
    current += 1;
    return current;
  }

  function decrement() {
    current -= 1;
    return current;
  }

  return { increment, decrement };
}

const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.decrement()); // 5
