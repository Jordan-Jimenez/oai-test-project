import React, { FC, useMemo } from "react";

import { useQuery } from "react-query";

import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";
import getPercentDifference from "../core/domain/getPercentDifference";
import getValueDifference from "../core/domain/getValueDifference";

interface IHistoricalPriceChangeProps {
	realTimePrice?: number;
	symbol?: string;
	parentLoading?: boolean;
}

const HistoricalPriceChange: FC<IHistoricalPriceChangeProps> = React.memo(
	({ realTimePrice = 0, symbol, parentLoading = false }) => {
		const client = useIex();

		const { data, isLoading } = useQuery(
			`getHistoricalPrices:${symbol}`,
			() => client.getHistoricalPrices(symbol!),
			{
				enabled: !!symbol,
				cacheTime: 10 * 60 * 1000,
				staleTime: 10 * 60 * 1000,
			}
		);

		const historicalPrices = useMemo(() => {
			if (!data?.data) {
				return undefined;
			}

			return JSON.parse(data?.data) as HistoricalPrice[] | undefined;
		}, [data?.data]);

		const change = useMemo(() => {
			return {
				dollar:
					getValueDifference(realTimePrice, historicalPrices?.[0].close) || 0,
				percent:
					getPercentDifference(realTimePrice, historicalPrices?.[0].close) || 0,
			};
		}, [realTimePrice, historicalPrices]);

		return (
			<PriceSummary
				changeDollar={change.dollar}
				changePercent={change.percent}
				changeOnly
				loading={parentLoading || isLoading}
			/>
		);
	}
);

export default HistoricalPriceChange;
