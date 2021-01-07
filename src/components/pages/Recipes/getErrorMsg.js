export const getErrorMsg = (errorText) => {
	switch (errorText) {
		case "Permission denied":
			return "Odmowa dostępu";
		default:
			return "Error";
	}
};
