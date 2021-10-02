function showSalary(users, age) {
  let usersYoungerOrEqualAnAge = users.filter((item) => item.age <= age);
  let usersNamesAndBalancesArray = usersYoungerOrEqualAnAge.map((item) => item.name + ', ' + item.balance)
  .join('\n');
  return usersNamesAndBalancesArray;
}
