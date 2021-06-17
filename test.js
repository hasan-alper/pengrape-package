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

//Random Date
date = random.date({ dateStart: [2021, 6, 17], dateEnd: [2021, 6, 18] });

//Print
console.log(date);
