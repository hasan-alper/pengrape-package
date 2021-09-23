const random = require("../number/main");

const getLetter = () => {
	return "abcdefghijklmnopqrstuvwxyz"[random.number({ min: 0, max: 25 })];
};

const getVowel = () => {
	return "aeiou"[random.number({ min: 0, max: 4 })];
};

const getConsonant = () => {
	return "bcdfghjklmnpqrstvwxyz"[random.number({ min: 0, max: 20 })];
};

const getSyllable = () => {
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
};

const getWord = (length) => {
	!length ? (length = random.number({ min: 2, max: 12 })) : (length = length);

	let str = getSyllable();
	for (let i = 0; i < random.number({ min: 0, max: Math.ceil(12 / 4) }); i++) {
		str += getSyllable();
	}

	return length === str.length ? str : getWord(length);
};

const getSentence = (length) => {
	!length ? (length = random.number({ min: 2, max: 12 })) : (length = length);

	let str = getWord();
	for (let i = 0; i < length - 1; i++) {
		str += " " + getWord();
	}
	str = str.charAt(0).toUpperCase() + str.slice(1);

	return str + ".";
};

const getParagraph = (length) => {
	!length ? (length = random.number({ min: 2, max: 12 })) : (length = length);

	let str = getSentence();
	for (let i = 0; i < length - 1; i++) {
		str += " " + getSentence();
	}

	return str;
};

const validate = (opts) => {
	if (!["letter", "syllable", "word", "sentence", "paragraph"].includes(opts.type)) throw RangeError('Invalid format. The value must be a "letter", "syllable", "word", "sentence" or "paragraph".');
	else if (!Number.isInteger(opts.length) && opts.length && opts.type !== "letter" && opts.type !== "syllable") throw TypeError("Invalid length, expected an integer.");
	else if (opts.length <= 1 && opts.type !== "letter" && opts.type !== "syllable") throw RangeError("Invalid length. The value cannot be less than two.");
	else if (opts.length > 12 && opts.type !== "letter" && opts.type !== "syllable") throw RangeError("Invalid length. The value cannot be more than twelve.");
	else if (!Number.isInteger(opts.construct)) throw TypeError("Invalid construct, expected an integer.");
	else if (opts.construct < 0) throw RangeError("Invalid construct. The value cannot be less than zero.");
	else return 0;
};

module.exports = { getLetter, getSyllable, getWord, getSentence, getParagraph, validate };
