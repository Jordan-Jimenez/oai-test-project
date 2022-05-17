import React, { FC } from "react";

interface IPriceSummaryProps {
	price?: number;
	changeDollar?: number;
	changePercent?: number;
	position?: "flex-end" | "flex-start";
}

const PriceSummary: FC<IPriceSummaryProps> = React.memo(
	({ price, changeDollar = 0, changePercent = 0, position = "flex-start" }) => {
		const styles = makeStyles({
			changePercent,
			position,
			hasPrice: !!price,
		});

		return (
			<div id="price-summary" style={styles.priceSummary}>
				{price && (
					<p id="price" style={styles.textLarge}>
						{price}
					</p>
				)}

				<div id="price-change-summary" style={styles.priceChangeSummary}>
					<p
						id="change-dollar"
						style={price ? styles.subtitle : styles.textLarge}
					>
						{"$" + changeDollar.toFixed(2)}
					</p>

					<div id="spacing" style={styles.spacing}>
						<p
							id="change-percent"
							style={price ? styles.subtitle : styles.textLarge}
						>
							{" (" +
								(changePercent > 0 ? "+" : "") +
								((changePercent || 0) * 100).toFixed(2) +
								")"}
						</p>
					</div>
				</div>
			</div>
		);
	}
);

interface IStyleProps {
	changePercent: number;
	position: "flex-end" | "flex-start";
	hasPrice: boolean;
}

const makeStyles = (props: IStyleProps) =>
	({
		priceSummary: {
			display: "flex",
			flexDirection: "column",
			alignItems: props.position,
			color: props.changePercent > 0 ? "#00C920" : "red",
		},
		textLarge: {
			fontSize: props.hasPrice ? "18px" : "24px",
			margin: 0,
			fontWeight: 700,
		},
		priceChangeSummary: {
			display: "flex",
			flexDirection: "row",
			marginTop: "0px",
		},
		spacing: {
			marginLeft: "5px",
		},
		subtitle: {
			fontSize: "12px",
			margin: 0,
		},
	} as { [key: string]: React.CSSProperties });

export default PriceSummary;
