import React, { useMemo } from "react";

import { useQuery } from "react-query";

import CompanyMarketSummary from "../containers/CompanyMarketSummary";
import { useIex } from "../context/IEXProvider";

const CompaniesPage = React.memo(() => {
	const client = useIex();

	const { data, isLoading } = useQuery(
		"getTopMarketCap",
		() => client.getTopMarketCap(),
		{
			staleTime: 30 * 60 * 1000,
			cacheTime: 30 * 60 * 1000,
		}
	);

	const companies = useMemo(() => {
		if (!data?.data) {
			return undefined;
		}

		return JSON.parse(data?.data) as Quote[] | undefined;
	}, [data]);

	return (
		<>
			{isLoading
				? [...Array(10)].map(() => <CompanyMarketSummary loading={isLoading} />)
				: companies?.map((q) => (
						<CompanyMarketSummary key={q.symbol} quote={q} />
				  ))}
		</>
	);
});

export default CompaniesPage;
