import React, { useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import LabeledValue from "../components/LabeledValue";
import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";
import fetchData from "../core/utils/fetchData";
import HistoricalPriceChange from "./HistoricalPriceChange";

const CompanyDetailsPriceSummaries = React.memo(() => {
	const { symbol } = useParams();

	const [quote, setQuote] = useState<Quote | undefined>();

	const client = useIex();

	useEffect(() => {
		if (!symbol) {
			return;
		}

		fetchData<Quote>(() => client.getQuote(symbol), setQuote, 10000);
	}, [client, symbol]);

	const realTimePrice = useMemo(
		() => quote?.iexRealtimePrice,
		[quote?.iexRealtimePrice]
	);

	return (
		<>
			<PriceSummary
				price={quote?.iexRealtimePrice}
				changeDollar={quote?.change}
				changePercent={quote?.changePercent}
			/>

			<LabeledValue
				label="1YR Change"
				valueComponent={<HistoricalPriceChange realTimePrice={realTimePrice} />}
			/>
		</>
	);
});

export default CompanyDetailsPriceSummaries;
