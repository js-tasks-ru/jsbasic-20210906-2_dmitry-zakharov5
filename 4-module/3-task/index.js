function highlight(table) {
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].cells.length; j++) {
      const checkDataAttribute = rows[i].cells[3].hasAttribute('data-available');
      if (!checkDataAttribute) {
        rows[i].setAttribute('hidden', '');
      }
      if (rows[i].cells[j].dataset.available === 'true') {
        rows[i].classList.add('available');
      }
      if (rows[i].cells[j].dataset.available === 'false') {
        rows[i].classList.add('unavailable');
      }
      if (rows[i].cells[2].innerHTML === 'm') {
        rows[i].classList.add('male');
      }
      if (rows[i].cells[2].innerHTML === 'f') {
        rows[i].classList.add('female');
      }
      if (+(rows[i].cells[1].innerHTML) < 18) {
        rows[i].style = "text-decoration: line-through";
      }
    }
  }
}
