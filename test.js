const random = require("./index");

//Number
number = random.number({ min: 10, max: 12, type: "decimal", precision: 6, construct: 0 });

//Color
color = random.color({ format: "all", values: ["rgb", 33, "234", null], syntax: "all", construct: 100 });

//Password
password = random.password({ excludeSimilar: true, construct: 20 });

//Spinner
spinner = random.spinner({ entries: ["pizza", "lasagna", "salad", "quesadilla"], returnDetails: false, returnEntries: false, construct: 200 });

//Dice
dice = random.dice({ notation: "20d100", construct: 10 });

//Random Text
text = random.text({ type: "word", length: 8, construct: 40 });

//Random Date
date = random.date({ dateStart: [1990, 6, 17], dateEnd: [2021, 6, 17], format: "dddd, dd mmm yyyy", construct: 60 });

//Print
console.log(date);
