import {
  RegistrationFormInterface,
  validateRegistrationForm
} from "libs/validators";
import { FormikConfig, FormikErrors } from "formik/dist/types";

interface valuesParamsInterface {
  [key: string]: string;
}

export const configFormRegistrationFormik: FormikConfig<RegistrationFormInterface> = {
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
  },
  onSubmit: (values: RegistrationFormInterface) => {
    alert(JSON.stringify(values, null, 2));
  }
};
