export default class UserTable {
    #table = null;
    constructor(rows) {
      this.rows = rows;
      this.#table = document.createElement('table');
      this.removeRow = this.removeRow.bind(this);
      this.render();
    }

    get elem() {
      return this.#table;
    }

    render() {
      this.#table.insertAdjacentHTML('beforeend', 
        `<thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
    </tr>
    </thead>`);

      for (const row of this.rows) {
        this.#table.insertAdjacentHTML('beforeend',
          `<tr>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.salary}</td>
      <td>${row.city}</td>
      <td><button class='btn'>[X]</button></td>
         </tr>`);
  
      }

      this.#table.addEventListener('click', this.removeRow);
    }

  removeRow = (event) => {
    const target = event.target;
    if (!target.classList.contains('btn')) {
      return;
    }
    const trParent = target.closest('tbody');
    trParent.remove();
  }
}

