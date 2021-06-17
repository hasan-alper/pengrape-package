# pengrape

A collection of utilities generating anything random.

## Installation

```bash
$ npm install pengrape
```

## Usage

```javascript
const random = require("pengrape");
```

### Number

```javascript
const number = random.number({ min: 0, max: 20 });
console.log(number); // 12
```

### Color

```javascript
const color = random.color({ format: "hex" });
console.log(color); // "#f28e51"
```

### Password

```javascript
const password = random.password({ symbol: false });
console.log(password); // "W7q0Va5RY53L63o7U0it"
```

### Spinner

```javascript
const spinner = random.spinner({ entries: ["Pizza", "Lasagna", "Quesadilla"] });
console.log(spinner); // "Lasagna"
```

### Dice

```javascript
const dice = random.dice({ notation: "2d10" });
console.log(dice); // { results: [ 4, 9 ], total: 13 }
```

### Text

```javascript
const text = random.text({ type: "word" });
console.log(text); // "inwitada"
```

### Date

```javascript
const date = random.date({ dateStart: [2021, 1, 1], dateEnd: [2021, 6, 17] });
console.log(date); // "2021-04-29"
```

See the [full docs](https://pengrape.herokuapp.com/docs) for details and examples.

## Issues

If any issues are found, they can be reported [here](https://github.com/hasan-alper/pengrape-package/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
