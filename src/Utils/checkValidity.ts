const emailRegex = /^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
export const isValidEmail = (email: string) => RegExp(emailRegex).exec(email);

export const isValidPassword = {
  lengthCheck: (password: string) => password.length >= 8,
  caseCheck: (password: string) => RegExp(/[A-Z]/).test(password),
  numberCheck: (password: string) => RegExp(/[0-9]/).test(password),
  checkAllValidations: (password: string) =>
    password.length >= 8 &&
    RegExp(/[A-Z]/).test(password) &&
    RegExp(/[0-9]/).test(password),
};
