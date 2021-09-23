module.exports.validate = (opts) => {
	if (!Array.isArray(opts.entries)) throw TypeError("Invalid entries, expected an array.");
	else if (!opts.entries[0]) throw RangeError("Invalid entries. The value must contain at least one entry.");
	else if (typeof opts.returnDetails !== "boolean") throw TypeError("Invalid returnDetails, expected a boolean.");
	else if (typeof opts.returnEntries !== "boolean") throw TypeError("Invalid returnEntries, expected a boolean.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};
