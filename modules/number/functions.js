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
	if (!Number.isInteger(opts.min)) throw TypeError("Invalid min, expected an integer.");
	else if (!Number.isInteger(opts.max)) throw TypeError("Invalid max, expected an integer.");
	else if (opts.min >= opts.max) throw RangeError("Invalid min and max. Min cannot be greater than max.");
	else if (!["integer", "decimal"].includes(opts.type)) throw RangeError('Invalid type. The value must be an "integer" or "decimal".');
	else if (!["none", "odd", "even"].includes(opts.parity)) throw RangeError('Invalid parity. The value must be a "none", "odd" or "even".');
	else if (!Number.isInteger(opts.precision)) throw TypeError("Invalid precision, expected an integer.");
	else if (opts.precision <= 0) throw RangeError("Invalid precision. The value cannot be less than one.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
