import {
  RegistrationFormInterface,
  validateRegistrationForm
} from "libs/validators";
import { FormikConfig } from "formik/dist/types";

export const configFormRegistrationFormik: Omit<
  FormikConfig<RegistrationFormInterface>,
  "onSubmit"
> = {
  initialValues: {
    name: "",
    email: "",
    password: "",
    password2: ""
  },
  validateOnChange: true,
  initialTouched: {
    name: false,
    email: false,
    password: false,
    password2: false
  },
  validate: validateRegistrationForm,
  initialErrors: {
    name: "",
    email: "",
    password: "",
    password2: ""
  }
};
