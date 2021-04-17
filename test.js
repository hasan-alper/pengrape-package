const random = require("./index");

//Random Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });

//Random Color
color = random.color({ format: "all" });

//Print
console.log(color);
