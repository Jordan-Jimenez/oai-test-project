import React, { FC, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";
import fetchData from "../core/utils/fetchData";

interface IHistoricalPriceChangeProps {
	realTimePrice?: number;
}

const HistoricalPriceChange: FC<IHistoricalPriceChangeProps> = React.memo(
	({ realTimePrice = 0 }) => {
		const { symbol } = useParams();

		const [historicalPrices, setHistoricalPrices] = useState<
			HistoricalPrice[] | undefined
		>();

		const client = useIex();

		useEffect(() => {
			if (!symbol) {
				return;
			}

			fetchData<HistoricalPrice[]>(
				() => client.getHistoricalPrices(symbol),
				setHistoricalPrices
			);
		}, [client, symbol]);

		const changeDollar = useMemo(() => {
			if (!historicalPrices || !historicalPrices[0].close) {
				return 0;
			}

			return realTimePrice - historicalPrices[0].close;
		}, [realTimePrice, historicalPrices]);

		const changePercent = useMemo(() => {
			if (!historicalPrices || !historicalPrices[0].close) {
				return 0;
			}

			return (
				(realTimePrice - historicalPrices[0].close) / historicalPrices[0].close
			);
		}, [realTimePrice, historicalPrices]);

		return (
			<PriceSummary changeDollar={changeDollar} changePercent={changePercent} />
		);
	}
);

export default HistoricalPriceChange;
