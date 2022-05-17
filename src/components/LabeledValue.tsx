import React, { FC } from "react";

interface ILabeledValueProps {
	label?: string;
	value?: string | number;
	valueComponent?: JSX.Element;
}

const LabeledValue: FC<ILabeledValueProps> = React.memo(
	({ label, value, valueComponent }) => {
		return (
			<div style={styles.container}>
				<h5 style={styles.label}>{label}</h5>

				<h5 style={styles.value}>{value}</h5>

				{valueComponent}
			</div>
		);
	}
);

const styles = {
	label: {
		color: "#A0A0A0",
		fontWeight: 400,
		margin: 0,
	},
	value: {
		fontWeight: 700,
		margin: 0,
	},
	container: {
		marginBottom: "35px",
	},
} as { [key: string]: React.CSSProperties };

export default LabeledValue;
