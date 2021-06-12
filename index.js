const { convert, pretty } = require("./colorConversions");
const random = {
	number: (opts) => {
		//Define default values for options.
		const minDefault = 0;
		const maxDefault = 20;
		const typeDefault = "integer"; // ["integer", "decimal"]
		const parityDefault = "none"; // ["none", "odd", "even"]
		const precisionDefault = 4;

		//Add selected default values.
		let {
			min = minDefault,
			max = maxDefault,
			type = typeDefault,
			parity = parityDefault,
			precision = precisionDefault,
		} = opts || {
			min: minDefault,
			max: maxDefault,
			type: typeDefault,
			parity: parityDefault,
			precision: precisionDefault,
		};

		//Check the values to make sure they do not break the code.
		if (!Number.isInteger(min)) return "Invalid min value. Min value must be an integer.";
		else if (!Number.isInteger(max)) return "Invalid max value. Max value must be an integer.";
		else if (min >= max) return "Invalid min and max values. Min value must be smaller than max value.";
		else if (!["integer", "decimal"].includes(type)) return 'Invalid type value. Type value must be "integer" or "decimal".';
		else if (!["none", "odd", "even"].includes(parity)) return 'Invalid parity value. Parity value must be "none", "odd" or "even".';
		else if (!Number.isInteger(precision)) return "Invalid precision value. Precision value must be an integer.";
		else if (precision <= 0) return "Invalid precision value. Precision value must be greater than 0.";

		//Return a number based on the options.
		if (type === "integer") {
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			if (parity === "none") return num;
			else if (parity === "odd") return num % 2 === 0 ? random.number({ min, max, type, parity: "odd" }) : num;
			else if (parity === "even") return num % 2 === 0 ? num : random.number({ min, max, type, parity: "even" });
		} else if (type === "decimal") {
			let num = `${Math.floor(Math.random() * (max - min)) + min}.`;
			for (let i = 0; i < precision; i++) {
				num += Math.floor(Math.random() * 10).toString();
			}
			return num;
		}
	},
	color: (opts) => {
		//Define default values for options.
		const formatDefault = "hex"; // ["hex", "rgb", "hsl"]
		const valuesDefault = [null, null, null, null];
		const syntaxDefault = "normal"; // ["normal", "list", "all"]

		//Add selected default values.
		let { format = formatDefault } = opts || { format: formatDefault };
		let { values = valuesDefault } = opts || { values: valuesDefault };
		let { syntax = syntaxDefault } = opts || { syntax: syntaxDefault };

		//Check the values to make sure they do not break the code.
		if (!["hex", "rgb", "hsl", "all"].includes(format)) return 'Invalid format value. Format value must be "hex", "rgb", "hsl" or "all".';
		if (!["normal", "list", "all"].includes(syntax)) return 'Invalid syntax value. Syntax value must be "normal", "list" or "all".';

		// Generate codes based on the format value.
		const charList = "0123456789abcdef";
		if (format === "rgb") {
			const r = values[0] || random.number({ min: 0, max: 255 });
			const g = values[1] || random.number({ min: 0, max: 255 });
			const b = values[2] || random.number({ min: 0, max: 255 });
			if (syntax === "normal") return pretty.rgb([r, g, b]);
			else if (syntax === "list") return [r, g, b];
			else if (syntax === "all") return { normal: pretty.rgb([r, g, b]), list: [r, g, b] };
		} else if (format === "hex") {
			const r = values[0] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
			const g = values[1] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
			const b = values[2] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
			if (syntax === "normal") return pretty.hex([r, g, b]);
			else if (syntax === "list") return [r, g, b];
			else if (syntax === "all") return { normal: pretty.hex([r, g, b]), list: [r, g, b] };
		} else if (format === "hsl") {
			const h = values[0] || random.number({ min: 0, max: 359 });
			const s = values[1] || random.number({ min: 0, max: 100 });
			const l = values[2] || random.number({ min: 0, max: 100 });
			if (syntax === "normal") return pretty.hsl([h, s, l]);
			else if (syntax === "list") return [h, s, l];
			else if (syntax === "all") return { normal: pretty.hsl([h, s, l]), list: [h, s, l] };
		} else if (format === "all") {
			if (values && values[0] === "rgb") {
				const r = values[1] || random.number({ min: 0, max: 255 });
				const g = values[2] || random.number({ min: 0, max: 255 });
				const b = values[3] || random.number({ min: 0, max: 255 });
				const rgb = [r, g, b];
				const hex = convert.rgbToHex(rgb);
				const hsl = convert.rgbToHsl(rgb);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				const phsl = pretty.hsl(hsl);
				if (syntax === "normal") return [phex, prgb, phsl];
				else if (syntax === "list") return [hex, rgb, hsl];
				else if (syntax === "all") return { normal: [phex, prgb, phsl], list: [hex, rgb, hsl] };
			} else if (values && values[0] === "hex") {
				const r = values[1] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				const g = values[2] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				const b = values[3] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				const hex = [r, g, b];
				const rgb = convert.hexToRgb(hex);
				const hsl = convert.hexToHsl(hex);
				const phex = pretty.hex(hex);
				const prgb = pretty.rgb(rgb);
				const phsl = pretty.hsl(hsl);
				if (syntax === "normal") return [phex, prgb, phsl];
				else if (syntax === "list") return [hex, rgb, hsl];
				else if (syntax === "all") return { normal: [phex, prgb, phsl], list: [hex, rgb, hsl] };
			} else if (values && values[0] === "hsl") {
				const h = values[1] || random.number({ min: 0, max: 359 });
				const s = values[2] || random.number({ min: 0, max: 100 });
				const l = values[3] || random.number({ min: 0, max: 100 });
				const hsl = [h, s, l];
				const rgb = convert.hslToRgb(hsl);
				const hex = convert.hslToHex(hsl);
				const phsl = pretty.hsl(hsl);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				if (syntax === "normal") return [phex, prgb, phsl];
				else if (syntax === "list") return [hex, rgb, hsl];
				else if (syntax === "all") return { normal: [phex, prgb, phsl], list: [hex, rgb, hsl] };
			} else {
				const r = random.number({ min: 0, max: 255 });
				const g = random.number({ min: 0, max: 255 });
				const b = random.number({ min: 0, max: 255 });
				const rgb = [r, g, b];
				const hex = convert.rgbToHex(rgb);
				const hsl = convert.rgbToHsl(rgb);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				const phsl = pretty.hsl(hsl);
				if (syntax === "normal") return [phex, prgb, phsl];
				else if (syntax === "list") return [hex, rgb, hsl];
				else if (syntax === "all") return { normal: [phex, prgb, phsl], list: [hex, rgb, hsl] };
			}
		}
	},
	password: (opts) => {
		//Define default values for options.
		const lowercaseDefault = true;
		const uppercaseDefault = true;
		const numberDefault = true;
		const symbolDefault = false;
		const lengthDefault = 20;

		//Add selected default values.
		let {
			lowercase = lowercaseDefault,
			uppercase = uppercaseDefault,
			number = numberDefault,
			symbol = symbolDefault,
			length = lengthDefault,
		} = opts || {
			lowercase: lowercaseDefault,
			uppercase: uppercaseDefault,
			number: numberDefault,
			symbol: symbolDefault,
			length: lengthDefault,
		};

		//Check the values to make sure they do not break the code.
		if (typeof lowercase !== "boolean") return "Invalid lowercase value. Lowercase value must be true or false";
		else if (typeof uppercase !== "boolean") return "Invalid uppercase value. Uppercase value must be true or false.";
		else if (typeof number !== "boolean") return "Invalid number value. Number value must be true or false.";
		else if (typeof symbol !== "boolean") return "Invalid symbol value. Symbol value must be true or false.";
		else if (!Number.isInteger(length)) return "Invalid length value. Length value must be an integer.";
		else if (length <= 0) return "Invalid length value. Length value must be greater than 0.";
		else if (!lowercase && !uppercase && !number && !symbol) return "Invalid character set. At least one character set must be selected.";

		//Define characters
		const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
		const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";
		const symbols = "~!@#$%&*-+=?/";

		// Combine characters according to included characters.
		let allCharacters = "";
		if (lowercase) allCharacters += lowercaseLetters;
		if (uppercase) allCharacters += uppercaseLetters;
		if (number) allCharacters += numbers;
		if (symbol) allCharacters += symbols;

		//Return a password based on the options.
		let password = "";
		for (let i = 0; i < length; i++) {
			password += allCharacters[random.number({ min: 0, max: allCharacters.length - 1 })];
		}
		return password;
	},
	spinner: (opts) => {
		//Define default values for options.
		const returnDetailsDefault = false;
		const returnEntriesDefault = false;

		//Add selected default values.
		let { entries, returnDetails = returnDetailsDefault, returnEntries = returnEntriesDefault } = opts || { returnDetails: returnDetailsDefault, returnEntries: returnEntriesDefault };

		//Check the values to make sure they do not break the code.
		if (!entries) return "Invalid entries value. Entries value must contain at least one entry.";
		if (!Array.isArray(entries)) return "Invalid entries value. Entries value must be an array.";
		else if (!entries[0]) return "Invalid entries value. Entries value must contain at least one entry.";
		else if (typeof returnDetails !== "boolean") return "Invalid returnDetails value. returnDetails value must be true or false.";
		else if (typeof returnEntries !== "boolean") return "Invalid returnEntries value. returnEntries value must be true or false.";

		//Generate a degree.
		const deg = random.number({ min: 0, max: 359 });

		//Create entry objects and return a winner.
		let winner;
		let detailedWinner;
		let allEntries = [];
		let allDetailedEntries = [];
		entries.forEach((entry, i) => {
			const max = Math.floor((360 / entries.length) * (i + 1));
			const min = Math.floor(max - 360 / entries.length);
			const data = max - min;
			let isWinner = false;
			const obj = { entry, min, max, deg, data, isWinner };
			if (obj.min < deg && max > deg) {
				winner = entry;
				detailedWinner = obj;
				obj.isWinner = true;
			}
			allEntries = entries;
			allDetailedEntries.push(obj);
		});

		[winner, detailedWinner, allEntries, allDetailedEntries];
		if (!returnEntries && !returnDetails) return winner;
		else if (!returnEntries && returnDetails) return detailedWinner;
		else if (returnEntries && !returnDetails) return allEntries;
		else if (returnEntries && returnDetails) return allDetailedEntries;
	},
	dice: (opts) => {
		//Define default values for options.
		const amountsDefault = 1;
		const sidesDefault = 4;

		//Add selected default values.
		let { notation = `${amountsDefault}d${sidesDefault}` } = opts || { notation: `${amountsDefault}d${sidesDefault}` };
		const splits = notation.split("d");
		const amounts = parseInt(splits[0] || amountsDefault);
		const sides = parseInt(splits[1] || sidesDefault);

		//Check the values to make sure they do not break the code.
		if (!Number.isInteger(amounts) || !Number.isInteger(sides)) return 'Invalid notation value. Notation value should look like these: "2d10", "d6", "12d" , "8" or "d"';
		else if (amounts <= 0) return "Invalid amounts value. Amounts value must be greater than 0.";
		else if (sides <= 1) return "Invalid sides value. Sides value must be greater than 1.";

		//Generate results based on options.
		let total = 0;
		let results = [];
		let allData = {};
		for (let i = 0; i < amounts; i++) {
			const result = random.number({ min: 1, max: sides });
			total += result;
			results.push(result);
		}
		allData = { results, total };

		return allData;
	},
	text: (opts) => {
		//Define default values for options.
		const typeDefault = "sentence"; //["letter", "syllable", "word", "sentence", "paragraph"]
		const maxLengthDefault = 12; //This value should be less than 60 to prevent max call stack size exceeding.

		//Add selected default values.
		let { type = typeDefault, length } = opts || { type: typeDefault };

		//Check the values to make sure they do not break the code.
		if (!["letter", "syllable", "word", "sentence", "paragraph"].includes(type)) return 'Invalid type value. Type value must be "letter", "syllable", "word", "sentence" or "paragraph".';
		else if (!Number.isInteger(length) && length && type !== "letter" && type !== "syllable") return "Invalid length value. Length value must be an integer.";
		else if (length <= 1 && type !== "letter" && type !== "syllable") return "Invalid length value. Length value must be greater than 1.";
		else if (length > maxLengthDefault && type !== "letter" && type !== "syllable") return `Invalid length value. Length value must be smaller than or equal to ${maxLengthDefault}.`;

		//Return a text based on the options.
		if (type === "letter") return getLetter();
		else if (type === "syllable") return getSyllable();
		else if (type === "word") return getWord(length);
		else if (type === "sentence") return getSentence(length);
		else if (type === "paragraph") return getParagraph(length);

		//Define functions.
		function getLetter() {
			return "abcdefghijklmnopqrstuvwxyz"[random.number({ min: 0, max: 25 })];
		}

		function getVowel() {
			return "aeiou"[random.number({ min: 0, max: 4 })];
		}

		function getConsonant() {
			return "bcdfghjklmnpqrstvwxyz"[random.number({ min: 0, max: 20 })];
		}

		function getSyllable() {
			switch (random.number({ min: 0, max: 6 })) {
				case 0:
					return getConsonant() + getVowel();
				case 1:
					return getVowel() + getConsonant();
				case 2:
					return getConsonant() + getVowel() + getConsonant();
				case 3:
					return getVowel() + getConsonant() + getConsonant();
				case 4:
					return getVowel() + getConsonant() + getVowel();
				case 5:
					return getConsonant() + getVowel() + getVowel() + getConsonant();
				case 6:
					return getConsonant() + getVowel() + getConsonant() + getConsonant();
			}
		}

		function getWord(length) {
			!length ? (length = random.number({ min: 2, max: maxLengthDefault })) : (length = length);

			let str = getSyllable();
			for (let i = 0; i < random.number({ min: 0, max: Math.ceil(maxLengthDefault / 4) }); i++) {
				str += getSyllable();
			}

			return length === str.length ? str : getWord(length);
		}

		function getSentence(length) {
			!length ? (length = random.number({ min: 2, max: maxLengthDefault })) : (length = length);

			let str = getWord();
			for (let i = 0; i < length - 1; i++) {
				str += " " + getWord();
			}
			str = str.charAt(0).toUpperCase() + str.slice(1);

			return str + ".";
		}

		function getParagraph(length) {
			!length ? (length = random.number({ min: 2, max: maxLengthDefault })) : (length = length);

			let str = getSentence();
			for (let i = 0; i < length - 1; i++) {
				str += " " + getSentence();
			}

			return str;
		}
	},
};

module.exports = random;
