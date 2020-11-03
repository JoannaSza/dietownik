export const getErrorMsg = (errorText) => {
  switch (errorText) {
    case 'EMAIL_NOT_FOUND':
      return 'Podany adres email nie istnieje.';
    case 'INVALID_PASSWORD':
      return 'Nieprawidłowe hasło.';
    case 'USER_DISABLED':
      return 'Użytkownik zablokowany przez administratora.';
    case 'EMAIL_EXISTS':
      return 'Użytkownik o podanym adresie email już istnieje.';
    case 'OPERATION_NOT_ALLOWED':
      return 'Tworzenie nowych użytkowników zostało zablokowane.';
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'Akcja wywołana za dużo razy, spróbuj ponownie później.';
    case 'INVALID_EMAIL':
      return 'Nieprawidłowy adres email';
    default:
      return 'Error';
  }
};
