import { validateRegistrationForm } from "libs/validators";

export const configFormRegistrationFormik = {
  initialTouched: {
    email: false,
    password: false,
    password2: false,
    name: false,
  },
  initialValues: {
    email: "",
    password: "",
    password2: "",
    name: "",
  },
  enableReinitialize: true,
  validate: validateRegistrationForm(),
};
