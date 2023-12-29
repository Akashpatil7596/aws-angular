export class BaseUrl {
  public static registration: string = 'api/v1/users/registeration';
  public static otpVerification: string = 'api/v1/users/verify-user';
  public static otpVerificationForForgotPassword: string =
    'api/v1/users/verify-forgot-password';
  public static login: string = 'api/v1/users/login';
  public logout: string = 'api/v1/users/logout';
  public getUser: string = 'api/v1/users/profile';
  public static forgotPassword: string = 'api/v1/users/forgot-password';
  public static resetPassword: string = 'api/v1/users/reset-password';
  public static updateUser: string = 'api/v1/users/';
  public static productList: string = 'api/v1/products';
}
