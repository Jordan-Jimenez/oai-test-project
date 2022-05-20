export default function getPercentDifference(
	newValue?: number,
	oldValue?: number
) {
	if (newValue === undefined || oldValue === undefined) {
		return undefined;
	}

	return (newValue - oldValue) / oldValue;
}
