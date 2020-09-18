const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

export interface RegistrationFormInterface {
  email: string;
  password: string;
  password2: string;
  name: string;
}

export function validateRegistrationForm() {
  return ({ password, password2, email, name }: RegistrationFormInterface) => {
    const errors: {
      [key: string]: string;
    } = {
      email: validateEmail(email),
      password: validatePassword(password),
      password2: validateMatchPasswords(password, password2),
      name: validateName(name),
    };

    return excludeUndefinedFromErrors(errors);
  };
}

export const helpViewForFormik = (touchedField: boolean, errorField: string) =>
  touchedField && !!errorField && errorField;

export const fieldValidate = (touched: boolean, errorField: string) =>
  touched && !!errorField ? "error" : !errorField ? "success" : null;

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

export const validateName = (name: string) =>
  !name ? "Обязательное поле" : undefined;

export const validateMatchPasswords = (password1: string, password2: string) =>
  password1 !== password2 ? "Пароли не совпадают" : undefined;

export const excludeUndefinedFromErrors = (errors: { [p: string]: string }) =>
  Object.keys(errors)
    .filter((key) => errors[key] !== undefined)
    .reduce<{
      [key: string]: string;
    }>((acc, currentKey) => {
      acc[currentKey] = errors[currentKey];
      return acc;
    }, {});
