import React, { FC } from "react";

interface ICompanyDetailsHeaderProps {
	companyName?: string;
	symbol?: string;
}

const CompanyDetailsHeader: FC<ICompanyDetailsHeaderProps> = React.memo(
	({ companyName, symbol }) => {
		return (
			<div style={styles.header}>
				<h3>{companyName}</h3>
				<h3 style={styles.symbol}>{symbol}</h3>
			</div>
		);
	}
);

const styles = {
	symbol: {
		color: "#A0A0A0",
		fontWeight: 400,
		marginLeft: "50px",
	},
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
} as { [key: string]: React.CSSProperties };

export default CompanyDetailsHeader;
