function truncate(str, maxlength) {
 if (str.length > maxlength) {
   let truncatedStr = str.slice(0, maxlength - 1) + '…'
   return truncatedStr
 } else {
   return str
 }
}

truncate('Вот, что мне хотелось бы сказать на эту тему:', 10)