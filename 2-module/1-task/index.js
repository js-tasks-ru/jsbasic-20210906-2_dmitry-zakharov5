function sumSalary(salaries) {
  let result = 0
  for (let key in salaries) {
    if (isFinite(salaries[key]) && typeof salaries[key] === 'number') {
      result += salaries[key]
    }
  }
  return result
}