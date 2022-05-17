import React, { useEffect, useState } from "react";

import CompanyMarketSummary from "../containers/CompanyMarketSummary";
import { useIex } from "../context/IEXProvider";
import fetchData from "../core/utils/fetchData";

const CompaniesPage = React.memo(() => {
	const [data, setData] = useState<Quote[] | undefined>();

	const client = useIex();

	useEffect(() => {
		fetchData<Quote[]>(() => client.getTopMarketCap(), setData);
	}, [client]);

	return (
		<>
			{data?.map((q, i) => (
				<CompanyMarketSummary key={q.symbol} quote={q} listIndex={i} />
			))}
		</>
	);
});

export default CompaniesPage;
