const random = require("./index");

//Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });

//Color
color = random.color({ format: "all", values: ["hex", 68, "22", null] });

//Password
password = random.password({ lowercase: true, uppercase: false, number: true, symbol: true, length: 12 });

//Spinner
spinner = random.spinner({ entries: ["pizza", "lasagna", "salad", "quesadilla"], returnAllEntries: true });

//Dice
dice = random.dice({ notation: "20d100" });

//Random Text
text = random.text({ type: "word", length: 8 });

//Print
console.log(color);
