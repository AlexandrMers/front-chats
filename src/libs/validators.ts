const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

export const validateEmail = (email: string) =>
  !email
    ? "Обязательное поле"
    : !regExpEmail.test(email)
    ? "Невалидный адрес почты"
    : undefined;

export const validatePassword = (password: string) =>
  !password
    ? "Обязательное поле"
    : !regExpPassword.test(password)
    ? "Невалидный пароль"
    : undefined;

export const excludeUndefinedFromErrors = (errors: { [p: string]: string }) =>
  Object.keys(errors)
    .filter((key) => errors[key] !== undefined)
    .reduce<{
      [key: string]: string;
    }>((acc, currentKey) => {
      acc[currentKey] = errors[currentKey];
      return acc;
    }, {});
