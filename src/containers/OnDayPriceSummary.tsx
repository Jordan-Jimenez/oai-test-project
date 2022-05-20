import React, { FC, useMemo } from "react";

import { useQuery } from "react-query";

import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";

interface IOnDayPriceSummaryProps {
	symbol?: string;
	parentLoading?: boolean;
}

const OnDayPriceSummary: FC<IOnDayPriceSummaryProps> = React.memo(
	({ symbol, parentLoading = false }) => {
		const client = useIex();

		const { data, isLoading } = useQuery(
			`getCompany:${symbol}`,
			() => client.getQuote(symbol!),
			{
				enabled: !!symbol,
				refetchInterval: 10000,
				cacheTime: 0,
			}
		);

		const quote = useMemo(() => {
			if (!data?.data) {
				return undefined;
			}

			return JSON.parse(data?.data || "") as Quote | undefined;
		}, [data]);

		return (
			<PriceSummary
				price={quote?.iexRealtimePrice}
				changeDollar={quote?.change}
				changePercent={quote?.changePercent}
				position="flex-end"
				loading={parentLoading || isLoading}
			/>
		);
	}
);

export default OnDayPriceSummary;
