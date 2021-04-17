const random = {
	number: (opts) => {
		//Define default values for options.
		const minDefault = 0;
		const maxDefault = 20;
		const typeDefault = "integer"; // ["integer", "decimal"]
		const parityDefault = null; // [null, "odd", "even"]
		const precisionDefault = 4;

		//Add selected default values.
		let { min = minDefault, max = maxDefault, type = typeDefault, parity = parityDefault, precision = precisionDefault } = opts || {
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
		else if (![null, "odd", "even"].includes(parity)) return 'Invalid parity value. Parity value must be null, "odd" or "even".';
		else if (!Number.isInteger(precision)) return "Invalid precision value. Precision value must be an integer.";
		else if (precision <= 0) return "Invalid precision value. Precision value must be greater than 0.";

		//Return a number based on the options.
		if (type === "integer") {
			let num = Math.floor(Math.random() * (max - min + 1)) + min;
			if (parity === null) return num;
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

		//Add selected default values.
		let { format = formatDefault } = opts || { format: formatDefault };

		//Check the values to make sure they do not break the code.
		if (!["hex", "rgb", "hsl", "all"].includes(format)) return 'Invalid format value. Format value must be "hex", "rgb", "hsl" or "all".';

		//Generate red, green and blue values.
		const r = random.number({ min: 0, max: 255 });
		const g = random.number({ min: 0, max: 255 });
		const b = random.number({ min: 0, max: 255 });

		//Define convertion functions.
		const rgbToHex = (r, g, b) => {
			return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		};

		const rgbToHsl = (r, g, b) => {
			r /= 255;
			g /= 255;
			b /= 255;

			let cmin = Math.min(r, g, b),
				cmax = Math.max(r, g, b),
				delta = cmax - cmin,
				h = 0,
				s = 0,
				l = 0;

			if (delta == 0) h = 0;
			else if (cmax == r) h = ((g - b) / delta) % 6;
			else if (cmax == g) h = (b - r) / delta + 2;
			else h = (r - g) / delta + 4;

			h = Math.round(h * 60);

			if (h < 0) h += 360;

			l = (cmax + cmin) / 2;
			s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
			s = Math.round(+(s * 100).toFixed(1));
			l = Math.round(+(l * 100).toFixed(1));

			return "hsl(" + h + ", " + s + "%, " + l + "%)";
		};

		//Return a color based on the options.
		const rgb = `rgb(${r}, ${g}, ${b})`;
		const hex = rgbToHex(r, g, b);
		const hsl = rgbToHsl(r, g, b);
		const all = `${hex};${rgb};${hsl}`.split(";");

		if (format === "hex") return hex;
		else if (format === "rgb") return rgb;
		else if (format === "hsl") return hsl;
		else if (format === "all") return all;
	},
	password: (opts) => {
		//Define default values for options.
		const lowercaseDefault = true;
		const uppercaseDefault = true;
		const numberDefault = true;
		const symbolDefault = false;
		const lengthDefault = 20;

		//Add selected default values.
		let { lowercase = lowercaseDefault, uppercase = uppercaseDefault, number = numberDefault, symbol = symbolDefault, length = lengthDefault } = opts || {
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
		if (!allCharacters) return "You must select at least one character set";

		//Return a password based on the options.
		let password = "";
		for (let i = 0; i < length; i++) {
			password += allCharacters[random.number({ min: 0, max: allCharacters.length - 1 })];
		}
		return password;
	},
};

module.exports = random;
