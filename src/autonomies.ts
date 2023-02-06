import data from "./data";

interface Options {
	with_code?: boolean;
	code?: string | number;
}

export const autonomies = (options: Options) => {
	const { with_code, code } = options;

	if (code !== undefined && typeof code !== "number" && typeof code !== "string") {
		throw new Error("The code must be a string or a number");
	}

	if (code !== undefined) {
		const autonomy = data.autonomies.find((item) => item.code == code);

		if (with_code === true) {
			return autonomy;
		}

		return autonomy?.name ?? undefined;
	}

	if (with_code === true) {
		return data.autonomies;
	}

	return data.autonomies.map((item) => item.name);
}