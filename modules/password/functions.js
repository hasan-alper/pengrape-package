module.exports.validate = (opts) => {
	if (typeof opts.lowercase !== "boolean") return "Invalid lowercase value. Lowercase value must be true or false";
	else if (typeof opts.uppercase !== "boolean") return "Invalid uppercase value. Uppercase value must be true or false.";
	else if (typeof opts.number !== "boolean") return "Invalid number value. Number value must be true or false.";
	else if (typeof opts.symbol !== "boolean") return "Invalid symbol value. Symbol value must be true or false.";
	else if (typeof opts.symbolPool !== "string") return "Invalid symbolPool value. SymbolPool value must a string.";
	else if (typeof opts.excludeSimilar !== "boolean") return "Invalid excludeSimilar value. ExcludeSimilar value must be true or false.";
	else if (opts.symbolPool.length < 1) return "Invalid symbolPool value. SymbolPool value must containg at least one character.";
	else if (!Number.isInteger(opts.minLength)) return "Invalid minLength value. MinLength value must be an integer.";
	else if (!Number.isInteger(opts.maxLength)) return "Invalid maxLength value. MaxLength value must be an integer.";
	else if (opts.minLength >= opts.maxLength) return "Invalid minLength and maxLength values. MinLength value must be smaller than maxLength value.";
	else if (opts.length && !Number.isInteger(opts.length)) return "Invalid length value. Length value must be an integer.";
	else if (opts.length <= 0) return "Invalid length value. Length value must be greater than 0.";
	else if (!opts.lowercase && !opts.uppercase && !opts.number && !opts.symbol) return "Invalid character set. At least one character set must be selected.";
	else if (!Number.isInteger(opts.construct)) return "Invalid construct value. Construction value must be an integer.";
	else if (opts.construct < 0) return "Invalid construct value. Construct value must be greater than or equal to 0.";
	else return 0;
};
