function getMinMax(str) {
  const minMaxObj = {
    min: null,
    max: null
  }
  let splitedStringArray = str.split(' ')
  let numberOnlyArray = splitedStringArray.filter( (item) => !isNaN(item))
  let minValue = Math.min.apply(null, numberOnlyArray)
  let maxValue = Math.max.apply(null, numberOnlyArray)
  minMaxObj.min = minValue
  minMaxObj.max = maxValue
  return minMaxObj
}