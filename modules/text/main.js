const random = require("../number/main");
const { setDefaults } = require("../functions");
const { getLetter, getSyllable, getWord, getSentence, getParagraph, validate } = require("./functions");

module.exports.text = (opts) => {
	opts = setDefaults(opts, "text");
	const { type, construct } = opts;

	if (validate(opts)) return validate(opts);

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		let length;
		if (opts.length) length = opts.length;
		else length = random.number({ min: 2, max: 12 });
		switch (type) {
			case "letter":
				results.push(getLetter());
				break;
			case "syllable":
				results.push(getSyllable());
				break;
			case "word":
				results.push(getWord(length));
				break;
			case "sentence":
				results.push(getSentence(length));
				break;
			case "paragraph":
				results.push(getParagraph(length));
				break;
		}
	}

	return +construct === 0 ? results[0] : results;
};
