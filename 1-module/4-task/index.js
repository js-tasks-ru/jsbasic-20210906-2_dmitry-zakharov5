function checkSpam(str) {
  let modifiedString = str.toLowerCase()
  console.log(modifiedString)
  if (modifiedString.includes('xbet') || modifiedString.includes('xxx')){
    return true
  } else {
    return false
  }
}
 /* Не понятно, почему не сработал метод modifiedString.includes('1xbet')? */