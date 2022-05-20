export default function getValueDifference(
	newValue?: number,
	oldValue?: number
) {
	if (newValue === undefined || oldValue === undefined) {
		return undefined;
	}

	return newValue - oldValue;
}
