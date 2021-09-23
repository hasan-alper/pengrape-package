const random = require("../number/main");
const { setDefaults } = require("../functions");
const { validate } = require("./functions");

module.exports.password = (opts) => {
	opts = setDefaults(opts, "password");
	const { lowercase, uppercase, number, symbol, minLength, maxLength, symbolPool, excludeSimilar, construct } = opts;

	if (validate(opts)) return validate(opts);

	let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
	let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let numbers = "0123456789";

	if (excludeSimilar) {
		lowercaseLetters = "abcdefghjkmnpqrstuvwxyz";
		uppercaseLetters = "ABCDEFGHJKMNPRSTUVWXYZ";
		numbers = "23456789";
	}

	let allCharacters = "";
	if (lowercase) allCharacters += lowercaseLetters;
	if (uppercase) allCharacters += uppercaseLetters;
	if (number) allCharacters += numbers;
	if (symbol) allCharacters += symbolPool;

	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		let length;
		if (opts.length) length = opts.length;
		else length = random.number({ min: minLength, max: maxLength });
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
};
