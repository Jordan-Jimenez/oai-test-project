import React, { FC } from "react";

import { Skeleton, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

const useStyles = makeStyles({
	header: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "20px",
	},
});

interface ICompanyDetailsHeaderProps {
	companyName?: string;
	symbol?: string;
	loading?: boolean;
}

const CompanyDetailsHeader: FC<ICompanyDetailsHeaderProps> = React.memo(
	({ companyName, symbol, loading = false }) => {
		const styles = useStyles();

		return (
			<div className={styles.header}>
				<Typography variant="h1">
					{loading === true ? <Skeleton width={200} /> : companyName}
				</Typography>
				<Typography variant="subtitle1">
					{loading === true ? <Skeleton width={50} /> : symbol}
				</Typography>
			</div>
		);
	}
);

export default CompanyDetailsHeader;
