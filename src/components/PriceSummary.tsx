import React, { FC } from "react";

import { Skeleton, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import { Theme } from "@mui/material/styles";
import Box from "@mui/system/Box/Box";

import formatChangePercent from "../core/domain/formatChangePercent";
import formatChangeDollar from "../core/domain/formatChangeDollar";

interface IStyleProps {
	changePercent: number;
	position: "flex-end" | "flex-start";
	hasPrice: boolean;
}

const useStyles = makeStyles<Theme, IStyleProps>({
	priceSummary: {
		display: "flex",
		flexDirection: "column",
		color: (props) => (props.changePercent > 0 ? "#00C920" : "red"),
	},
	priceChangeSummary: {
		display: "flex",
		flexDirection: "row",
		marginTop: "0px",
	},
});

interface IPriceSummaryProps {
	price?: number;
	changeOnly?: boolean;
	changeDollar?: number;
	changePercent?: number;
	position?: "flex-end" | "flex-start";
	loading?: boolean;
}

const PriceSummary: FC<IPriceSummaryProps> = React.memo(
	({
		price = 0,
		changeDollar = 0,
		changePercent = 0,
		position = "flex-start",
		changeOnly = false,
		loading = false,
	}) => {
		const styles = useStyles({
			changePercent,
			position,
			hasPrice: !!price,
		});

		return (
			<Box
				className={styles.priceSummary}
				alignItems={position}
				color={changePercent > 0 ? "#00C920" : "red"}
			>
				{!changeOnly && (
					<Typography variant="h1">
						{loading ? <Skeleton width={100} /> : `$${price?.toFixed(2)}`}
					</Typography>
				)}

				<div className={styles.priceChangeSummary}>
					<Typography variant={price ? "caption" : "h3"}>
						{loading ? (
							<Skeleton width={75} />
						) : (
							`${formatChangeDollar(changeDollar)}`
						)}
					</Typography>

					<Typography ml={0.5} variant={price ? "caption" : "h3"}>
						{loading ? (
							<Skeleton width={75} />
						) : (
							`${formatChangePercent(changePercent)}`
						)}
					</Typography>
				</div>
			</Box>
		);
	}
);

export default PriceSummary;
