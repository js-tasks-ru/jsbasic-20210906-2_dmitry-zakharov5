let calculator = {
  firstValue: null,
  secondValue: null,
  
  read: function(a, b) {
    this.firstValue = a;
    this.secondValue = b;
      },

  sum: function() {
    return this.firstValue + this.secondValue; 
  },

  mul: function() {
    return this.firstValue * this.secondValue;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
