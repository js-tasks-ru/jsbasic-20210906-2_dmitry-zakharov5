function factorial(n) {
  let result = n;
  if (n === 0 || n === 1) {
    result = 1;
  } else {
    for (let i = (n - 1); i > 0; i--) {
      result *= i;
    }
  }
  return result;
}