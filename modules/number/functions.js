module.exports.getInteger = (min, max) => {
	let num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
};

module.exports.getOdd = (min, max) => {
	let num = this.getInteger(min, max);
	if (num % 2 === 0) return this.getOdd(min, max);
	else return num;
};

module.exports.getEven = (min, max) => {
	let num = this.getInteger(min, max);
	if (num % 2 === 0) return num;
	else return this.getEven(min, max);
};

module.exports.validate = (opts) => {
	if (!Number.isInteger(opts.min)) return "Invalid min value. Min value must be an integer.";
	else if (!Number.isInteger(opts.max)) return "Invalid max value. Max value must be an integer.";
	else if (opts.min >= opts.max) return "Invalid min and max values. Min value must be smaller than max value.";
	else if (!["integer", "decimal"].includes(opts.type)) return 'Invalid type value. Type value must be "integer" or "decimal".';
	else if (!["none", "odd", "even"].includes(opts.parity)) return 'Invalid parity value. Parity value must be "none", "odd" or "even".';
	else if (!Number.isInteger(opts.precision)) return "Invalid precision value. Precision value must be an integer.";
	else if (opts.precision <= 0) return "Invalid precision value. Precision value must be greater than 0.";
	else if (!Number.isInteger(opts.construct)) return "Invalid construct value. Construction value must be an integer.";
	else if (opts.construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";
	else return 0;
};
