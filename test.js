const random = require("./index");

//Random Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });

//Random Color
color = random.color({ format: "all" });

//Random Password
password = random.password({ lowercase: true, uppercase: false, number: true, symbol: true, length: 12 });

//Print
console.log(password);
