import { AxiosResponse } from "axios";

export default async function fetchData<T>(
	request: () => Promise<AxiosResponse<T, any> | undefined>,
	responseCallback?:
		| React.Dispatch<React.SetStateAction<T | undefined>>
		| ((res: T | undefined) => void),
	refetchIntervalMs?: number
) {
	const res = JSON.parse((await request())?.data as any as string) as T;

	if (responseCallback) {
		responseCallback(res);
	}

	if (refetchIntervalMs) {
		setTimeout(
			() => fetchData(request, responseCallback, refetchIntervalMs),
			refetchIntervalMs
		);
	}

	return res;
}
