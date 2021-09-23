module.exports.validate = (opts) => {
	if (typeof opts.lowercase !== "boolean") throw TypeError("Invalid lowercase, expected a boolean.");
	else if (typeof opts.uppercase !== "boolean") throw TypeError("Invalid uppercase, expected a boolean.");
	else if (typeof opts.number !== "boolean") throw TypeError("Invalid number, expected a boolean.");
	else if (typeof opts.symbol !== "boolean") throw TypeError("Invalid symbol, expected a boolean.");
	else if (typeof opts.symbolPool !== "string") throw TypeError("Invalid symbolPool, expected a string.");
	else if (typeof opts.excludeSimilar !== "boolean") throw TypeError("Invalid excludeSimilar, expected a boolean.");
	else if (opts.symbolPool.length < 1) throw RangeError("Invalid symbolPool. The value value must contain at least one character.");
	else if (!Number.isInteger(opts.minLength)) throw TypeError("Invalid minLength, expected an integer.");
	else if (!Number.isInteger(opts.maxLength)) throw TypeError("Invalid maxLength, expected an integer.");
	else if (opts.minLength >= opts.maxLength) throw RangeError("Invalid minLength and maxLength. MinLength cannot be greater than maxLength.");
	else if (opts.length && !Number.isInteger(opts.length)) throw TypeError("Invalid length, expected an integer.");
	else if (opts.length <= 0) throw RangeError("Invalid length. The value cannot be less than one.");
	else if (!opts.lowercase && !opts.uppercase && !opts.number && !opts.symbol) RangeError("Invalid character set. At least one character set must be selected.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
