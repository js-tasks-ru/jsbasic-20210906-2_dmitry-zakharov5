let calculator = {
<<<<<<< HEAD
  // ваш код
  firstValue: null,
  secondValue: null,
  
  read: function(a, b) {
    this.firstValue = a;
    this.secondValue = b;
      },
=======
  firstValue: null,
  secondValue: null,
  read: function(a, b) {
    calculator.firstValue = a;
    calculator.secondValue = b;
  },
>>>>>>> 99486e3a8ad081cf1edc722847296c3e1ba956fa

  sum: function() {
    return this.firstValue + this.secondValue; 
  },

  mul: function() {
    return this.firstValue * this.secondValue;
<<<<<<< HEAD
  },
=======
  }
>>>>>>> 99486e3a8ad081cf1edc722847296c3e1ba956fa
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
