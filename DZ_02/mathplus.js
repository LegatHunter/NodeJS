function calculate(num1, num2, oper) {
  switch (oper) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "/":
      if (num2 === 0) {
        return console.log('На 0 делить нельзя');
      } else{
        return num1 / num2;
      }
      break;
    case "*":
      return num1 * num2;
      break;
    default:
      return console.log('Недопустимая операция');
      break;
  }
};

module.exports = { calculate }