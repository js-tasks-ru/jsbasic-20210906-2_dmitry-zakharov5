function camelize(str) {
  let splitedArray = str.split('-');
  let modifiedArray = splitedArray.map((item, i) => {  
    if (i === 0) {
      return item.toLowerCase();
    } else {
      return item[0].toUpperCase() + item.slice(1);
    }
  });
  return modifiedArray.join('');
}