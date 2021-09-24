# pengrape

A collection of utilities generating anything random.

## Overview

Pengrape provides 8 different utilities which include generating random number, color, palette, password, spinner, dice, text and date. Their behavior can be customized by providing different arguments.

## Installation

```bash
$ npm install pengrape
```

## Usage

```javascript
const random = require("pengrape");
```

### Generate a result

You can use the available methods to generate a random result according to your preferences.

```javascript
random.number({ min: 10, max: 20 }); // 17
```

### Construct results

To generate multiple results, you can use the construct option in any methods you want.

```javascript
random.number({ min: 10, max: 20, construct: 4 }); // [12, 14, 10, 19]
```

## Examples

### Color

```javascript
const color = random.color({ format: "hex" });
console.log(color); // "#f28e51"
```

### Dice

```javascript
const dice = random.dice({ notation: "2d10" });
console.log(dice); // { results: [ 4, 9 ], total: 13 }
```

### Date

```javascript
const date = random.date({ dateStart: [2021, 1, 1], dateEnd: [2021, 6, 17] });
console.log(date); // "2021-04-29"
```

## Full docs

See the [full docs](https://pengrape.herokuapp.com/docs) for details and examples.

## Issues

If any issues are found, they can be reported [here](https://github.com/hasan-alper/pengrape-package/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
