import React, { FC } from "react";

import { useNavigate } from "react-router-dom";

import OnDayPriceChange from "./OnDayPriceSummary";

interface ICompanyMarketSummaryProps {
	quote: Quote;
	listIndex?: number;
}

const CompanyMarketSummary: FC<ICompanyMarketSummaryProps> = React.memo(
	({ quote, listIndex = 0 }) => {
		const styles = makeStyles({
			priceChangePercent: quote.changePercent || 0,
			listIndex,
		});

		const navigate = useNavigate();

		const navToCompanyDetails = () => {
			navigate(`/${quote.symbol}`);
		};

		return (
			<div onClick={navToCompanyDetails} style={styles.container}>
				<p id="company-symbol" style={styles.textLarge}>
					{quote.symbol}
				</p>

				<OnDayPriceChange symbol={quote.symbol} />
			</div>
		);
	}
);

interface IStyleProps {
	priceChangePercent: number;
	listIndex: number;
}

const makeStyles = (props: IStyleProps) =>
	({
		container: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			width: "calc(100% - 40px)",
			backgroundColor: props.listIndex % 2 > 0 ? "#F4F4F4" : "transparent",
			padding: "20px",
			"&:hover": {
				cursor: "pointer",
				backgroundColor: "#2e7362",
			},
		},
		textLarge: {
			fontSize: "24px",
			margin: 0,
		},
	} as { [key: string]: React.CSSProperties });

export default CompanyMarketSummary;
