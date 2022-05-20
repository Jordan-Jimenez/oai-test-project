import { Axios, AxiosResponse } from "axios";

class IEXClient {
	private axios: Axios;

	constructor() {
		this.axios = new Axios({
			baseURL: "https://cloud.iexapis.com/stable",
			params: {
				token: process.env.REACT_APP_IEX_TOKEN,
			},
		});
	}

	public async getHistoricalPrices(
		symbol: string
	): Promise<AxiosResponse<string, any>> {
		return await this.axios.get(
			`/stock/${symbol}/chart/1y?chartCloseOnly=true`
		);
	}

	public async getTopMarketCap(): Promise<
		AxiosResponse<string, any> | undefined
	> {
		return await this.axios.get("/stock/market/list/mostactive");
	}

	public async getQuote(symbol: string): Promise<AxiosResponse<string, any>> {
		return await this.axios.get(`/stock/${symbol}/quote`);
	}

	public async getCompany(symbol: string): Promise<AxiosResponse<string, any>> {
		return await this.axios.get(`/stock/${symbol}/company`);
	}
}

export default IEXClient;
