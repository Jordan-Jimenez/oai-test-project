import { createTheme } from "@mui/material/styles";

export default createTheme({
	palette: {
		info: {
			main: "#F4F4F4",
		},
		success: {
			main: "#00C920",
		},
	},
	typography: {
		fontFamily: "Inter",
		button: {
			textTransform: "none",
		},
		h1: {
			fontSize: "24px",
			fontWeight: 700,
		},
		subtitle1: {
			fontSize: "24px",
			fontWeight: 400,
			color: "#A0A0A0",
		},
		h3: {
			fontSize: "18px",
			fontWeight: 700,
		},
		subtitle2: {
			fontSize: "18px",
			fontWeight: 400,
			color: "#A0A0A0",
		},
		caption: {
			fontSize: "14px",
			fontWeight: 700,
		},
	},
});
