import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import LabeledValue from "../components/LabeledValue";
import { useIex } from "../context/IEXProvider";
import fetchData from "../core/utils/fetchData";
import CompanyDetailsPriceSummaries from "../containers/CompanyDetailsPriceSummaries";
import CompanyDetailsHeader from "../containers/CompanyDetailsHeader";

const CompanyPage = React.memo(() => {
	const { symbol } = useParams();

	const client = useIex();

	const [company, setCompany] = useState<Company | undefined>();

	useEffect(() => {
		if (!symbol) {
			return;
		}

		fetchData<Company>(() => client.getCompany(symbol), setCompany);
	}, [client, symbol]);

	return (
		<div style={styles.container}>
			<CompanyDetailsHeader
				companyName={company?.companyName}
				symbol={company?.symbol}
			/>

			<CompanyDetailsPriceSummaries />

			<div style={styles.spacing} />

			<LabeledValue label="CEO" value={company?.CEO} />

			<LabeledValue label="INDUSTRY" value={company?.industry} />

			<LabeledValue label="EMPLOYEES" value={company?.employees} />
		</div>
	);
});

const styles = {
	container: {
		height: "calc(100% - 40px)",
		width: "calc(100% - 40px",
		padding: "20px",
	},
	spacing: {
		marginTop: "50px",
	},
} as { [key: string]: React.CSSProperties };

export default CompanyPage;
