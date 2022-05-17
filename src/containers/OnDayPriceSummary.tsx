import { FC, useEffect, useState } from "react";

import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";
import fetchData from "../core/utils/fetchData";

interface IOnDayPriceSummaryProps {
	symbol?: string;
}

const OnDayPriceSummary: FC<IOnDayPriceSummaryProps> = ({ symbol }) => {
	const [data, setData] = useState<Quote | undefined>();

	const client = useIex();

	useEffect(() => {
		if (!symbol) {
			return;
		}

		fetchData<Quote>(() => client.getQuote(symbol), setData, 10000);
	}, [client, symbol]);

	return (
		<PriceSummary
			price={data?.iexRealtimePrice}
			changeDollar={data?.change}
			changePercent={data?.changePercent}
			position="flex-end"
		/>
	);
};

export default OnDayPriceSummary;
