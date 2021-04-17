const random = require("./index");

//Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });

//Color
color = random.color({ format: "all" });

//Password
password = random.password({ lowercase: true, uppercase: false, number: true, symbol: true, length: 12 });

//Spinner
spinner = random.spinner({ entries: ["pizza", "lasagna", "salad", "quesadilla"], returnAllEntries: true });

//Dice
dice = random.dice({ notation: "20d100" });

//Print
console.log(dice);
