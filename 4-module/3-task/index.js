function highlight(table) {
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].cells[2].innerHTML === 'm') {
      rows[i].cells[2].classList.add('male');
    }
    if (rows[i].cells[2].innerHTML === 'f') {
      rows[i].cells[2].classList.add('female');
    }
  }
}
