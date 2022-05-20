export default function formatChangePercent(value: number) {
	return "(" + (value > 0 ? "+" : "") + ((value || 0) * 100).toFixed(2) + ")";
}
