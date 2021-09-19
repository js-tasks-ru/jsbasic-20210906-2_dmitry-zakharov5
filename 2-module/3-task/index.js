let calculator = {
  firstValue: null,
  secondValue: null,
  read: function(a, b) {
    calculator.firstValue = a;
    calculator.secondValue = b;
  },

  sum: function() {
    return this.firstValue + this.secondValue; 
  },

  mul: function() {
    return this.firstValue * this.secondValue;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
