export default function formatChangeDollar(value: number) {
	return (
		(value > 0 ? "+ " : value === 0 ? "" : "- ") +
		("$" + Math.abs(parseFloat(value.toFixed(2))))
	);
}
