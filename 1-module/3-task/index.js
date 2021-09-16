function ucFirst(str) {
  if (str === '') {
    return str;
  } else if (str.length === 1) {
    let changeFirstLetter = str.toUpperCase();
    return changeFirstLetter;
  } else {
    let modifiedFirstLetter = str[0].toUpperCase();
    let receivedSubstring = str.slice(1);
    let modifiedName = modifiedFirstLetter + receivedSubstring;
    return modifiedName;
  }
}