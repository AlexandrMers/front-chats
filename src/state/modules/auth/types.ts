export interface AuthModuleStateInterface {
  isAuth: boolean;
  loginLoading: boolean;
  loginError: {
    status: string;
    message: string;
  };
  registrationLoading: boolean;
  registrationError: any;
  registrationSuccess: boolean;
  confirmedRegistration: boolean;
  confirmedRegistrationLoading: boolean;
  confirmedRegistrationError: any;
}
