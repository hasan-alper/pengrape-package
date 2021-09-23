module.exports.number = {
	min: 0,
	max: 20,
	type: "integer", // ["integer", "decimal"]
	parity: "none", // ["none", "odd", "even"]
	precision: 4,
	construct: 0,
};

module.exports.color = {
	format: "hex", // ["hex", "rgb", "hsl", "all"]
	syntax: "normal", // ["normal", "list", "all"]
	values: [null, null, null, null],
	construct: 0,
};

module.exports.palette = {
	harmony: "analogous", // ["analogous", "monochromatic", "triad", "complementary", "shades"]
	format: "hex", // ["hex", "rgb", "hsl", "all"]
	syntax: "normal", // ["normal", "list", "all"]
	construct: 0,
};

module.exports.password = {
	lowercase: true,
	uppercase: true,
	number: true,
	symbol: false,
	minLength: 16,
	maxLength: 24,
	symbolPool: "~!@#$%&*-+=?",
	excludeSimilar: false,
	construct: 0,
};

module.exports.spinner = {
	returnDetails: false,
	returnEntries: false,
	construct: 0,
};

module.exports.dice = {
	notation: "1d6",
	construct: 0,
};

module.exports.text = {
	type: "sentence", // ["letter", "syllable", "word", "sentence", "paragraph"]
	construct: 0,
};

module.exports.date = {
	dateStart: [2021, 1, 1],
	dateEnd: [2022, 1, 1],
	format: "yyyy-mm-dd",
	construct: 0,
};
