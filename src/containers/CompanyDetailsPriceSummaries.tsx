import React, { FC, useMemo } from "react";

import Box from "@mui/material/Box/Box";
import { useQuery } from "react-query";

import LabeledValue from "../components/LabeledValue";
import PriceSummary from "../components/PriceSummary";
import { useIex } from "../context/IEXProvider";
import HistoricalPriceChange from "./HistoricalPriceChange";

interface ICompanyDetailsPriceSummaries {
	symbol?: string;
}

const CompanyDetailsPriceSummaries: FC<ICompanyDetailsPriceSummaries> =
	React.memo(({ symbol }) => {
		const client = useIex();

		const { data, isLoading } = useQuery(
			`getOnDayChange:${symbol}`,
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

			return JSON.parse(data?.data) as Quote | undefined;
		}, [data?.data]);

		return (
			<>
				<PriceSummary
					price={quote?.iexRealtimePrice}
					changeDollar={quote?.change}
					changePercent={quote?.changePercent}
					loading={isLoading}
				/>

				<Box mt={6}>
					<LabeledValue
						label="1YR Change"
						valueComponent={
							<HistoricalPriceChange
								realTimePrice={quote?.iexRealtimePrice}
								parentLoading={isLoading}
								symbol={symbol}
							/>
						}
					/>
				</Box>
			</>
		);
	});

export default CompanyDetailsPriceSummaries;
