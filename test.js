const random = require("./index");

const number = random.number({ min: -1, max: 1, type: "decimal", parity: "even", precision: 3, construct: 20 });

const color = random.color({ format: "rgb", syntax: "list", values: [null, 220, null], construct: 4 });

const palette = random.palette({ harmony: "triad", format: "all", syntax: "all", construct: 3 });

const password = random.password({ minLength: 4, maxLength: 6, symbol: false, uppercase: false, symbolPool: ":)", construct: 10 });

const spinner = random.spinner({ entries: ["pizza", "lasagna", "salad", "quesadilla"], returnDetails: true, returnEntries: true, construct: 4 });

const dice = random.dice({ notation: "10d30", construct: 10 });

const text = random.text({ type: "word", construct: 4 });

const date = random.date({ dateStart: [1993, 6, 17], dateEnd: [1993, 6, 18], format: "dd/mm/yyyy", construct: 2 });

console.log(date);
