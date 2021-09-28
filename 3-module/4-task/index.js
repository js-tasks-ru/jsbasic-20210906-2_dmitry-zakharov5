function showSalary(users, age) {
  let usersYoungerOrEqualAnAge = users.filter( (item) => item.age <= age)
  let ordinalString = ''
  let lastString = ''
  usersYoungerOrEqualAnAge.forEach( (item, i, array) => {
    if (i < array.length -1) {
      ordinalString += item.name + ', ' + item.balance + '\n'
    }
    lastString = item.name + ', ' + item.balance
  })
  return ordinalString + lastString
}