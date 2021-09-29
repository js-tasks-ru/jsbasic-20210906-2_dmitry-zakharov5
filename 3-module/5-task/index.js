const inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';

function getMinMax(str) {
  const minMaxObj = {
    min: null,
    max: null,
  };
  let splitedStringArray = str.split(' ');
  let numberOnlyArray = splitedStringArray.filter((item) => !isNaN(item));
  let minValue = Math.min.apply(null, numberOnlyArray);
  let maxValue = Math.max.apply(null, numberOnlyArray);
  minMaxObj.min = minValue;
  minMaxObj.max = maxValue;
  return minMaxObj;
}