const random = require("./index");

//RANDOM NUMBER
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });
console.log(number);
