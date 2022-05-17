import { Axios } from "axios";

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

	public async getHistoricalPrices(symbol: string): Promise<HistoricalPrice> {
		return this.axios.get(`/stock/${symbol}/chart/1y?chartCloseOnly=true`);
	}

	public async getTopMarketCap(): Promise<Quote> {
		return await this.axios.get("/stock/market/list/mostactive");
	}

	public async getQuote(symbol: string): Promise<Quote> {
		return await this.axios.get(`/stock/${symbol}/quote`);
	}

	public async getCompany(symbol: string): Promise<Company> {
		return await this.axios.get(`/stock/${symbol}/company`);
	}
}

export default IEXClient;
