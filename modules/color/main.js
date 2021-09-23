const random = require("../number/main");
const { setDefaults } = require("../functions");
const { convert, pretty, validate } = require("./functions");

module.exports.color = (opts) => {
	opts = setDefaults(opts, "color");
	const { format, syntax, values, construct } = opts;

	if (validate(opts)) return validate(opts);

	const charList = "0123456789abcdef";
	let results = [];
	for (let i = 0; construct ? i < +construct : i < 1; i++) {
		if (format === "rgb") {
			const r = values[0] || random.number({ max: 255 });
			const g = values[1] || random.number({ max: 255 });
			const b = values[2] || random.number({ max: 255 });
			switch (syntax) {
				case "normal":
					results.push(pretty.rgb([r, g, b]));
					break;
				case "list":
					results.push([r, g, b]);
					break;
				case "all":
					results.push({ normal: pretty.rgb([r, g, b]), list: [r, g, b] });
					break;
			}
		} else if (format === "hex") {
			const r = values[0] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
			const g = values[1] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
			const b = values[2] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
			switch (syntax) {
				case "normal":
					results.push(pretty.hex([r, g, b]));
					break;
				case "list":
					results.push([r, g, b]);
					break;
				case "all":
					results.push({ normal: pretty.hex([r, g, b]), list: [r, g, b] });
					break;
			}
		} else if (format === "hsl") {
			const h = values[0] || random.number({ max: 359 });
			const s = values[1] || random.number({ max: 100 });
			const l = values[2] || random.number({ max: 100 });
			switch (syntax) {
				case "normal":
					results.push(pretty.hsl([h, s, l]));
					break;
				case "list":
					results.push([h, s, l]);
					break;
				case "all":
					results.push({ normal: pretty.hsl([h, s, l]), list: [h, s, l] });
					break;
			}
		} else if (format === "all") {
			if (values && values[0] === "rgb") {
				const r = values[1] || random.number({ max: 255 });
				const g = values[2] || random.number({ max: 255 });
				const b = values[3] || random.number({ max: 255 });
				const rgb = [r, g, b];
				const hex = convert.rgbToHex(rgb);
				const hsl = convert.rgbToHsl(rgb);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				const phsl = pretty.hsl(hsl);
				switch (syntax) {
					case "normal":
						results.push([phex, prgb, phsl]);
						break;
					case "list":
						results.push([hex, rgb, hsl]);
						break;
					case "all":
						results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
						break;
				}
			} else if (values && values[0] === "hex") {
				const r = values[1] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
				const g = values[2] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
				const b = values[3] || charList[random.number({ max: 15 })] + charList[random.number({ max: 15 })];
				const hex = [r, g, b];
				const rgb = convert.hexToRgb(hex);
				const hsl = convert.hexToHsl(hex);
				const phex = pretty.hex(hex);
				const prgb = pretty.rgb(rgb);
				const phsl = pretty.hsl(hsl);
				switch (syntax) {
					case "normal":
						results.push([phex, prgb, phsl]);
						break;
					case "list":
						results.push([hex, rgb, hsl]);
						break;
					case "all":
						results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
						break;
				}
			} else if (values && values[0] === "hsl") {
				const h = values[1] || random.number({ max: 359 });
				const s = values[2] || random.number({ max: 100 });
				const l = values[3] || random.number({ max: 100 });
				const hsl = [h, s, l];
				const rgb = convert.hslToRgb(hsl);
				const hex = convert.hslToHex(hsl);
				const phsl = pretty.hsl(hsl);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				switch (syntax) {
					case "normal":
						results.push([phex, prgb, phsl]);
						break;
					case "list":
						results.push([hex, rgb, hsl]);
						break;
					case "all":
						results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
						break;
				}
			} else {
				const r = random.number({ max: 255 });
				const g = random.number({ max: 255 });
				const b = random.number({ max: 255 });
				const rgb = [r, g, b];
				const hex = convert.rgbToHex(rgb);
				const hsl = convert.rgbToHsl(rgb);
				const prgb = pretty.rgb(rgb);
				const phex = pretty.hex(hex);
				const phsl = pretty.hsl(hsl);
				switch (syntax) {
					case "normal":
						results.push([phex, prgb, phsl]);
						break;
					case "list":
						results.push([hex, rgb, hsl]);
						break;
					case "all":
						results.push({ normal: [phex, prgb, phsl], list: [hex, rgb, hsl] });
						break;
				}
			}
		}
	}

	return +construct === 0 ? results[0] : results;
};
