const { calculateResult } = require("./calculateResult");
const colors = require("colors");

const total = calculateResult([12.1, 32.2, 43.1], 0.9);
console.log(total > 50 ? colors.red(total) : colors.green(total));
