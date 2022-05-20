import React, { FC } from "react";

import { Box, Typography } from "@mui/material";

interface ILabeledValueProps {
	label?: string;
	value?: string | number;
	valueComponent?: JSX.Element;
}

const LabeledValue: FC<ILabeledValueProps> = React.memo(
	({ label, value, valueComponent }) => {
		return (
			<Box mb={4}>
				<Typography variant="subtitle2">{label}</Typography>

				<Typography variant="h3">{value}</Typography>

				{valueComponent}
			</Box>
		);
	}
);

export default LabeledValue;
