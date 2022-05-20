import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import IEXProvider from "./context/IEXProvider";
import CompanyPage from "./pages/Company";
import CompaniesPage from "./pages/Companies";
import theme from "./core/theme";
import queryClient from "./core/queryClient";

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<IEXProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<Routes>
							<Route path="/" element={<CompaniesPage />} />
							<Route path="/:symbol" element={<CompanyPage />} />
						</Routes>
					</Router>
				</ThemeProvider>
			</IEXProvider>
		</QueryClientProvider>
	);
}

export default App;
