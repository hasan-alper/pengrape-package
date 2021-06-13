const random = require("./index");

//Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6 });

//Color
color = random.color({ format: "all", values: ["rgb", 33, "234", null], syntax: "all" });

//Password
password = random.password({ excludeSimilar: true });

//Spinner
spinner = random.spinner({ entries: ["pizza", "lasagna", "salad", "quesadilla"], returnDetails: false, returnEntries: false });

//Dice
dice = random.dice({ notation: "20d100" });

//Random Text
text = random.text({ type: "word", length: 8 });

//Print
console.log(password);
