function filterRange(arr, a, b) {
 return arr.filter ((num) => {
   if (a <= b) {
     return (num >= a) && (num <= b)
   }
   return (num <= a) && (num >= b)
 })
}