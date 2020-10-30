export const getErrorMsg = (errorText) => {
	switch (errorText) {
		case "EMAIL_NOT_FOUND":
			return "Podany adres email nie istnieje.";
		case "INVALID_PASSWORD":
			return "Nieprawidłowe hasło.";
		case "USER_DISABLED":
			return "Użytkownik zablokowany przez administratora.";
		default:
			return "Error";
	}
};
