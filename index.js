const { convert, pretty } = require("./colorConversions");
const random = {
	number: (opts) => {
		//Define default values for options.
		const minDefault = 0;
		const maxDefault = 20;
		const typeDefault = "integer"; // ["integer", "decimal"]
		const parityDefault = "none"; // ["none", "odd", "even"]
		const precisionDefault = 4;
		const constructDefault = 0;

		//Add selected default values.
		let {
			min = minDefault,
			max = maxDefault,
			type = typeDefault,
			parity = parityDefault,
			precision = precisionDefault,
			construct = constructDefault,
		} = opts || {
			min: minDefault,
			max: maxDefault,
			type: typeDefault,
			parity: parityDefault,
			precision: precisionDefault,
			construct: constructDefault,
		};

		//Check the values to make sure they do not break the code.
		if (!Number.isInteger(min)) return "Invalid min value. Min value must be an integer.";
		else if (!Number.isInteger(max)) return "Invalid max value. Max value must be an integer.";
		else if (min >= max) return "Invalid min and max values. Min value must be smaller than max value.";
		else if (!["integer", "decimal"].includes(type)) return 'Invalid type value. Type value must be "integer" or "decimal".';
		else if (!["none", "odd", "even"].includes(parity)) return 'Invalid parity value. Parity value must be "none", "odd" or "even".';
		else if (!Number.isInteger(precision)) return "Invalid precision value. Precision value must be an integer.";
		else if (precision <= 0) return "Invalid precision value. Precision value must be greater than 0.";
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Return a number based on the options.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			if (type === "integer") {
				if (parity === "none") generateANumber(min, max);
				else if (parity === "odd") generateAnOdd(min, max);
				else if (parity === "even") generateAnEven(min, max);
			} else if (type === "decimal") {
				let num = `${Math.floor(Math.random() * (max - min)) + min}.`;
				for (let i = 0; i < precision; i++) {
					num += Math.floor(Math.random() * 10).toString();
				}
				results.push(num);
			}
		}
		return +construct === 0 ? results[0] : results;

		function generateANumber(min, max) {
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			results.push(num);
		}

		function generateAnOdd(min, max) {
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			if (num % 2 === 0) generateAnOdd(min, max);
			else results.push(num);
		}

		function generateAnEven(min, max) {
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			if (num % 2 === 0) results.push(num);
			else generateAnEven(min, max);
		}
	},
	color: (opts) => {
		//Define default values for options.
		const formatDefault = "hex"; // ["hex", "rgb", "hsl"]
		const valuesDefault = [null, null, null, null];
		const syntaxDefault = "normal"; // ["normal", "list", "all"]
		const constructDefault = 0;

		//Add selected default values.
		let { format = formatDefault } = opts || { format: formatDefault };
		let { values = valuesDefault } = opts || { values: valuesDefault };
		let { syntax = syntaxDefault } = opts || { syntax: syntaxDefault };
		let { construct = constructDefault } = opts || { construct: constructDefault };

		//Check the values to make sure they do not break the code.
		if (!["hex", "rgb", "hsl", "all"].includes(format)) return 'Invalid format value. Format value must be "hex", "rgb", "hsl" or "all".';
		if (!["normal", "list", "all"].includes(syntax)) return 'Invalid syntax value. Syntax value must be "normal", "list" or "all".';
		if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		// Generate codes based on the format value.
		const charList = "0123456789abcdef";
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			if (format === "rgb") {
				const r = values[0] || random.number({ min: 0, max: 255 });
				const g = values[1] || random.number({ min: 0, max: 255 });
				const b = values[2] || random.number({ min: 0, max: 255 });
				if (syntax === "normal") results.push(pretty.rgb([r, g, b]));
				else if (syntax === "list") results.push([r, g, b]);
				else if (syntax === "all") results.push({ normal: pretty.rgb([r, g, b]), list: [r, g, b] });
			} else if (format === "hex") {
				const r = values[0] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				const g = values[1] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				const b = values[2] || charList[random.number({ min: 0, max: 15 })] + charList[random.number({ min: 0, max: 15 })];
				if (syntax === "normal") results.push(pretty.hex([r, g, b]));
				else if (syntax === "list") results.push([r, g, b]);
				else if (syntax === "all") results.push({ normal: pretty.hex([r, g, b]), list: [r, g, b] });
			} else if (format === "hsl") {
				const h = values[0] || random.number({ min: 0, max: 359 });
				const s = values[1] || random.number({ min: 0, max: 100 });
				const l = values[2] || random.number({ min: 0, max: 100 });
				if (syntax === "normal") results.push(pretty.hsl([h, s, l]));
				else if (syntax === "list") results.push([h, s, l]);
				else if (syntax === "all") results.push({ normal: pretty.hsl([h, s, l]), list: [h, s, l] });
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
					if (syntax === "normal") results.push([phex, prgb, phsl]);
					else if (syntax === "list") results.push([hex, rgb, hsl]);
					else if (syntax === "all") results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
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
					if (syntax === "normal") results.push([phex, prgb, phsl]);
					else if (syntax === "list") results.push([hex, rgb, hsl]);
					else if (syntax === "all") results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
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
					if (syntax === "normal") results.push([phex, prgb, phsl]);
					else if (syntax === "list") results.push([hex, rgb, hsl]);
					else if (syntax === "all") results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
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
					if (syntax === "normal") results.push([phex, prgb, phsl]);
					else if (syntax === "list") results.push([hex, rgb, hsl]);
					else if (syntax === "all") results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
				}
			}
		}
		return +construct === 0 ? results[0] : results;
	},
	palette: (opts) => {
		//Define default values for options.
		const harmonyDefault = "analogous"; // ["analogous", "monochromatic", "triad", "complementary", "shades"]
		const formatDefault = "hex"; // ["hex", "rgb", "hsl"]
		const syntaxDefault = "normal"; // ["normal", "list", "all"]
		const constructDefault = 0;

		//Add selected default values.
		let { harmony = harmonyDefault } = opts || { harmony: harmonyDefault };
		let { format = formatDefault } = opts || { format: formatDefault };
		let { syntax = syntaxDefault } = opts || { syntax: syntaxDefault };
		let { construct = constructDefault } = opts || { construct: constructDefault };

		//Check the values to make sure they do not break the code.
		if (!["analogous", "monochromatic", "triad", "complementary", "shades"].includes(harmony)) return 'Invalid harmony value. Format value must be "analogous", "monochromatic", "triad", "complementary" or "shades".';
		if (!["hex", "rgb", "hsl", "all"].includes(format)) return 'Invalid format value. Format value must be "hex", "rgb", "hsl" or "all".';
		if (!["normal", "list", "all"].includes(syntax)) return 'Invalid syntax value. Syntax value must be "normal", "list" or "all".';
		if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Return a password based on the harmony value.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			const main_color = random.color({ format: "all", syntax: "all" });
			let main_hue = +main_color.list[2][0];
			let main_sat = +main_color.list[2][1];
			let main_lig = +main_color.list[2][2];
			const params = [main_hue, main_sat, main_lig];
			if (harmony == "analogous") results.push(analogous(...params));
			else if (harmony == "monochromatic") results.push(monochromatic(...params));
			else if (harmony == "triad") results.push(triad(...params));
			else if (harmony == "complementary") results.push(complementary(...params));
			else if (harmony == "shades") results.push(shades(...params));
		}
		return +construct === 0 ? results[0] : results;

		//Define functions.
		function analogous(h, s, l) {
			if (s > 95) s -= 5;

			const hue_values = [(h + 30 + 360) % 360, (h + 15 + 360) % 360, h, (h - 15 + 360) % 360, (h - 30 + 360) % 360];
			const sat_values = [s + 5, s + 5, s, s + 5, s + 5];
			const lig_values = [50, 48, 52, 48, 50];

			let result = [];
			for (let i = 0; i < 5; i++) {
				result.push([hue_values[i], sat_values[i], lig_values[i]]);
			}

			return generateResults(result, format, syntax);
		}

		function monochromatic(h, s, l) {
			const hue_values = [h, h, h, h, h];
			let sat_values = [];
			if (s > 40) sat_values = [s, s - 30, s, s - 30, s];
			else sat_values = [s, s + 30, s, s + 30, s];
			const lig_values = [22, 49, 47, 22, 38];

			let result = [];
			for (let i = 0; i < 5; i++) {
				result.push([hue_values[i], sat_values[i], lig_values[i]]);
			}

			return generateResults(result, format, syntax);
		}

		function triad(h, s, l) {
			if (s > 90) s -= 10;

			const hue_values = [h, (h + 120 + 360) % 360, h, (h - 120 + 360) % 360, (h - 120 + 360) % 360];
			const sat_values = [s + 10, s + 10, s, s + 10, s + 5];
			const lig_values = [32, 46, 46, 46, 32];

			let result = [];
			for (let i = 0; i < 5; i++) {
				result.push([hue_values[i], sat_values[i], lig_values[i]]);
			}

			return generateResults(result, format, syntax);
		}

		function complementary(h, s, l) {
			if (s > 90) s -= 10;
			else if (s < 10) s += 30;

			const hue_values = [h, h, h, (h + 180 + 360) % 360, (h + 180 + 360) % 360];
			const sat_values = [s + 10, s - 10, s, s + 10, s];
			const lig_values = [35, 50, 50, 35, 50];

			let result = [];
			for (let i = 0; i < 5; i++) {
				result.push([hue_values[i], sat_values[i], lig_values[i]]);
			}

			return generateResults(result, format, syntax);
		}

		function shades(h, s, l) {
			const hue_values = [h, h, h, h, h];
			const sat_values = [s, s, s, s, s];
			const lig_values = [34, 22, 47, 50, 42];

			let result = [];
			for (let i = 0; i < 5; i++) {
				result.push([hue_values[i], sat_values[i], lig_values[i]]);
			}

			return generateResults(result, format, syntax);
		}

		function generateResults(rst, fmt, syx) {
			let hexCodesNormal = [];
			let rgbCodesNormal = [];
			let hslCodesNormal = [];
			let hexCodesList = [];
			let rgbCodesList = [];
			let hslCodesList = [];
			for (let i = 0; i < 5; i++) {
				hexCodesNormal.push(pretty.hex(convert.hslToHex(rst[i])));
				rgbCodesNormal.push(pretty.rgb(convert.hslToRgb(rst[i])));
				hslCodesNormal.push(pretty.hsl(rst[i]));
				hexCodesList.push(convert.hslToHex(rst[i]));
				rgbCodesList.push(convert.hslToRgb(rst[i]));
				hslCodesList.push(rst[i]);
			}
			if (syx == "normal") {
				if (fmt == "hex") return hexCodesNormal;
				else if (fmt == "rgb") return rgbCodesNormal;
				else if (fmt == "hsl") return hslCodesNormal;
				else if (fmt == "all") return [hexCodesNormal, rgbCodesNormal, hslCodesNormal];
			} else if (syx == "list") {
				if (fmt == "hex") return hexCodesList;
				else if (fmt == "rgb") return rgbCodesList;
				else if (fmt == "hsl") return hslCodesList;
				else if (fmt == "all") return [hexCodesList, rgbCodesList, hslCodesList];
			} else if (syx == "all") {
				if (fmt == "hex") return { normal: hexCodesNormal, list: hexCodesList };
				else if (fmt == "rgb") return { normal: rgbCodesNormal, list: rgbCodesList };
				else if (fmt == "hsl") return { normal: hslCodesNormal, list: hslCodesList };
				else if (fmt == "all") return { normal: [hexCodesNormal, rgbCodesNormal, hslCodesNormal], list: [hexCodesList, rgbCodesList, hslCodesList] };
			}
		}
	},
	password: (opts) => {
		//Define default values for options.
		const lowercaseDefault = true;
		const uppercaseDefault = true;
		const numberDefault = true;
		const symbolDefault = false;
		const minLengthDefault = 16;
		const maxLengthDefault = 24;
		const symbolPoolDefault = "~!@#$%&*-+=?";
		const excludeSimilarDefault = false;
		const constructDefault = 0;

		//Add selected default values.
		let {
			lowercase = lowercaseDefault,
			uppercase = uppercaseDefault,
			number = numberDefault,
			symbol = symbolDefault,
			minLength = minLengthDefault,
			maxLength = maxLengthDefault,
			length = random.number({ min: minLength, max: maxLength }),
			symbolPool = symbolPoolDefault,
			excludeSimilar = excludeSimilarDefault,
			construct = constructDefault,
		} = opts || {
			lowercase: lowercaseDefault,
			uppercase: uppercaseDefault,
			number: numberDefault,
			symbol: symbolDefault,
			minLength: minLengthDefault,
			maxLength: maxLengthDefault,
			length: random.number({ min: minLengthDefault, max: maxLengthDefault }),
			excludeSimilar: excludeSimilarDefault,
			construct: constructDefault,
		};

		//Check the values to make sure they do not break the code.
		if (typeof lowercase !== "boolean") return "Invalid lowercase value. Lowercase value must be true or false";
		else if (typeof uppercase !== "boolean") return "Invalid uppercase value. Uppercase value must be true or false.";
		else if (typeof number !== "boolean") return "Invalid number value. Number value must be true or false.";
		else if (typeof symbol !== "boolean") return "Invalid symbol value. Symbol value must be true or false.";
		else if (typeof symbolPool !== "string") return "Invalid symbolPool value. SymbolPool value must a string.";
		else if (typeof excludeSimilar !== "boolean") return "Invalid excludeSimilar value. ExcludeSimilar value must be true or false.";
		else if (symbolPool.length < 1) return "Invalid symbolPool value. SymbolPool value must containg at least one character.";
		else if (!Number.isInteger(minLength)) return "Invalid minLength value. MinLength value must be an integer.";
		else if (!Number.isInteger(maxLength)) return "Invalid maxLength value. MaxLength value must be an integer.";
		else if (minLength >= maxLength) return "Invalid minLength and maxLength values. MinLength value must be smaller than maxLength value.";
		else if (!Number.isInteger(length)) return "Invalid length value. Length value must be an integer.";
		else if (length <= 0) return "Invalid length value. Length value must be greater than 0.";
		else if (!lowercase && !uppercase && !number && !symbol) return "Invalid character set. At least one character set must be selected.";
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Define characters
		let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
		let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let numbers = "0123456789";
		if (excludeSimilar) {
			lowercaseLetters = "abcdefghjkmnpqrstuvwxyz";
			uppercaseLetters = "ABCDEFGHJKMNPRSTUVWXYZ";
			numbers = "23456789";
		}

		// Combine characters according to included characters.
		let allCharacters = "";
		if (lowercase) allCharacters += lowercaseLetters;
		if (uppercase) allCharacters += uppercaseLetters;
		if (number) allCharacters += numbers;
		if (symbol) allCharacters += symbolPool;

		//Return a password based on the options.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			let password = "";
			for (let i = 0; i < length; i++) {
				let charIndex;
				if (allCharacters.length === 1) charIndex = 0;
				else charIndex = random.number({ min: 0, max: allCharacters.length - 1 });

				password += allCharacters[charIndex];
			}
			results.push(password);
		}
		return +construct === 0 ? results[0] : results;
	},
	spinner: (opts) => {
		//Define default values for options.
		const returnDetailsDefault = false;
		const returnEntriesDefault = false;
		const constructDefault = 0;

		//Add selected default values.
		let {
			entries,
			returnDetails = returnDetailsDefault,
			returnEntries = returnEntriesDefault,
			construct = constructDefault,
		} = opts || { returnDetails: returnDetailsDefault, returnEntries: returnEntriesDefault, construct: constructDefault };

		//Check the values to make sure they do not break the code.
		if (!entries) return "Invalid entries value. Entries value must contain at least one entry.";
		if (!Array.isArray(entries)) return "Invalid entries value. Entries value must be an array.";
		else if (!entries[0]) return "Invalid entries value. Entries value must contain at least one entry.";
		else if (typeof returnDetails !== "boolean") return "Invalid returnDetails value. returnDetails value must be true or false.";
		else if (typeof returnEntries !== "boolean") return "Invalid returnEntries value. returnEntries value must be true or false.";
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Create entry objects and return a winner.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			const deg = random.number({ min: 0, max: 359 });
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
				if (obj.min <= deg && max > deg) {
					winner = entry;
					detailedWinner = obj;
					obj.isWinner = true;
				}
				allEntries = entries;
				allDetailedEntries.push(obj);
			});
			if (!returnEntries && !returnDetails) results.push(winner);
			else if (!returnEntries && returnDetails) results.push(detailedWinner);
			else if (returnEntries && !returnDetails) results.push(allEntries);
			else if (returnEntries && returnDetails) results.push(allDetailedEntries);
		}
		return +construct === 0 ? results[0] : results;
	},
	dice: (opts) => {
		//Define default values for options.
		const amountsDefault = 1;
		const sidesDefault = 4;
		const constructDefault = 0;

		//Add selected default values.
		let { notation = `${amountsDefault}d${sidesDefault}`, construct = constructDefault } = opts || { notation: `${amountsDefault}d${sidesDefault}`, construct: constructDefault };
		const splits = notation.split("d");
		const amounts = parseInt(splits[0] || amountsDefault);
		const sides = parseInt(splits[1] || sidesDefault);

		//Check the values to make sure they do not break the code.
		if (!Number.isInteger(amounts) || !Number.isInteger(sides)) return 'Invalid notation value. Notation value should look like these: "2d10", "d6", "12d" , "8" or "d"';
		else if (amounts <= 0) return "Invalid amounts value. Amounts value must be greater than 0.";
		else if (sides <= 1) return "Invalid sides value. Sides value must be greater than 1.";
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Generate results based on options.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			let total = 0;
			let output = [];
			let allData = {};
			for (let i = 0; i < amounts; i++) {
				const result = random.number({ min: 1, max: sides });
				total += result;
				output.push(result);
			}
			allData = { output, total };
			results.push(allData);
		}
		return +construct === 0 ? results[0] : results;
	},
	text: (opts) => {
		//Define default values for options.
		const typeDefault = "sentence"; //["letter", "syllable", "word", "sentence", "paragraph"]
		const maxLengthDefault = 12; //This value should be less than 60 to prevent max call stack size exceeding.
		const constructDefault = 0;

		//Add selected default values.
		let { type = typeDefault, length, construct = constructDefault } = opts || { type: typeDefault, construct: constructDefault };

		//Check the values to make sure they do not break the code.
		if (!["letter", "syllable", "word", "sentence", "paragraph"].includes(type)) return 'Invalid type value. Type value must be "letter", "syllable", "word", "sentence" or "paragraph".';
		else if (!Number.isInteger(length) && length && type !== "letter" && type !== "syllable") return "Invalid length value. Length value must be an integer.";
		else if (length <= 1 && type !== "letter" && type !== "syllable") return "Invalid length value. Length value must be greater than 1.";
		else if (length > maxLengthDefault && type !== "letter" && type !== "syllable") return `Invalid length value. Length value must be smaller than or equal to ${maxLengthDefault}.`;
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Return a text based on the options.
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			if (type === "letter") results.push(getLetter());
			else if (type === "syllable") results.push(getSyllable());
			else if (type === "word") results.push(getWord(length));
			else if (type === "sentence") results.push(getSentence(length));
			else if (type === "paragraph") results.push(getParagraph(length));
		}
		return +construct === 0 ? results[0] : results;

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
	date: (opts) => {
		//Define default values for options.
		const dateStartDefault = [2021, 1, 1];
		const dateEndDefault = [2022, 1, 1];
		const formatDefault = "yyyy-mm-dd";
		const constructDefault = 0;

		//Add selected default values.
		let {
			dateStart = dateStartDefault,
			dateEnd = dateEndDefault,
			format = formatDefault,
			construct = constructDefault,
		} = opts || {
			dateStart: dateStartDefault,
			dataEnd: dateEndDefault,
			format: formatDefault,
			construct: constructDefault,
		};

		//Check the values to make sure they do not break the code.
		if (dateStart[0] < 1000 || dateEnd[0] < 1000) return "Invalid year. Year value must be greater than or equal to 1000.";
		else if (dateStart[0] > 3000 || dateEnd[0] > 3000) return "Invalid year. Year value must be smaller than or equal to 3000.";
		else if (new Date(...dateStart).getTime() > new Date(...dateEnd).getTime()) return "Invalid date values. The start date must come before the end date.";
		else if (typeof format !== "string") return "Invalid format value. Format value must a string.";
		else if (!Number.isInteger(construct)) return "Invalid construct value. Construction value must be an integer.";
		else if (construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";

		//Return a date based on format
		let results = [];
		for (let i = 0; construct ? i < +construct : i < 1; i++) {
			dateStart[1]--;
			dateStart[2];
			dateEnd[1]--;
			dateEnd[2]++;
			const result = new Date(new Date(...dateStart).getTime() + Math.random() * (new Date(...dateEnd).getTime() - new Date(...dateStart).getTime()));

			//Define flags
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			const flags = {
				yy: result.getFullYear().toString().slice(-2),
				yyyy: result.getFullYear().toString(),
				m: (result.getMonth() + 1).toString(),
				mm: pad(result.getMonth() + 1),
				mmm: months[result.getMonth()].slice(0, 3),
				mmmm: months[result.getMonth()],
				d: result.getDate().toString(),
				dd: pad(result.getDate()),
				ddd: days[result.getDay()].slice(0, 3),
				dddd: days[result.getDay()],
			};
			results.push(formatDate(format, flags));
		}
		return +construct === 0 ? results[0] : results;

		//Define funtions
		function pad(x) {
			if (x < 10) x = "0" + x;
			else x = x.toString();
			return x;
		}

		function formatDate(format, flags) {
			if (format.includes("yyyy")) format = format.replace("yyyy", flags.yyyy);
			else if (format.includes("yy")) format = format.replace("yy", flags.yy);
			if (format.includes("mmmm")) format = format.replace("mmmm", flags.mmmm);
			else if (format.includes("mmm")) format = format.replace("mmm", flags.mmm);
			else if (format.includes("mm")) format = format.replace("mm", flags.mm);
			else if (format.includes("m")) format = format.replace("m", flags.m);
			if (format.includes("dddd")) format = format.replace("dddd", flags.dddd);
			else if (format.includes("ddd")) format = format.replace("ddd", flags.ddd);
			else if (format.includes("dd")) format = format.replace("dd", flags.dd);
			else if (format.includes("d")) format = format.replace("d", flags.d);
			return format;
		}
	},
};

module.exports = random;
