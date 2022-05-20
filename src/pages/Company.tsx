import React, { useMemo } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import makeStyles from "@mui/styles/makeStyles/makeStyles";

import LabeledValue from "../components/LabeledValue";
import { useIex } from "../context/IEXProvider";
import CompanyDetailsPriceSummaries from "../containers/CompanyDetailsPriceSummaries";
import CompanyDetailsHeader from "../containers/CompanyDetailsHeader";

const useStyles = makeStyles({
	container: {
		padding: "20px",
	},
});

const CompanyPage = React.memo(() => {
	const style = useStyles();

	const { symbol } = useParams();

	const client = useIex();

	const { data, isLoading } = useQuery(
		`getCompany:${symbol}`,
		() => client.getCompany(symbol!),
		{
			enabled: !!symbol,
			cacheTime: 10 * 60 * 1000,
			staleTime: 10 * 60 * 1000,
		}
	);

	const company = useMemo(() => {
		if (!data?.data) {
			return undefined;
		}
		return JSON.parse(data?.data) as Company | undefined;
	}, [data]);

	return (
		<div className={style.container}>
			<CompanyDetailsHeader
				companyName={company?.companyName}
				symbol={company?.symbol}
				loading={isLoading}
			/>

			<CompanyDetailsPriceSummaries symbol={symbol} />

			<LabeledValue label="CEO" value={company?.CEO} />

			<LabeledValue label="INDUSTRY" value={company?.industry} />

			<LabeledValue label="EMPLOYEES" value={company?.employees} />
		</div>
	);
});

export default CompanyPage;
