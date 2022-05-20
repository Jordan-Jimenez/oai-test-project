import React, { FC } from "react";

import { useNavigate } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import { Skeleton, Typography } from "@mui/material";

import OnDayPriceChange from "./OnDayPriceSummary";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "calc(100% - 40px)",
		padding: "20px",
		"&:hover": {
			cursor: "pointer",
			opacity: "0.2",
		},
		"&:nth-child(2n)": {
			backgroundColor: "#F4F4F4",
		},
	},
});

interface ICompanyMarketSummaryProps {
	quote?: Quote;
	loading?: boolean;
}

const CompanyMarketSummary: FC<ICompanyMarketSummaryProps> = React.memo(
	({ quote, loading = false }) => {
		const styles = useStyles();

		const navigate = useNavigate();

		const navToCompanyDetails = () => {
			navigate(`/${quote?.symbol}`);
		};

		return (
			<div onClick={navToCompanyDetails} className={styles.container}>
				<Typography variant="h1" id="company-symbol">
					{loading ? <Skeleton width={75} /> : quote?.symbol}
				</Typography>

				<OnDayPriceChange parentLoading={loading} symbol={quote?.symbol} />
			</div>
		);
	}
);

export default CompanyMarketSummary;
