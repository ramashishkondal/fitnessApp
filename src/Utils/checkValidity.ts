const emailRegex = /^[\w-.]+@([\w-]+.)+[\w]{1,}$/;
export const isValidEmail = (email: string) => RegExp(emailRegex).exec(email);


export const isValidPassword = {
  lengthCheck: (password: string) => password.length >= 8,
  caseCheck: (password: string) => RegExp(/[A-Z]/).test(password),
  numberCheck: (password: string) => RegExp(/[0-9]/).test(password),
  checkAll: (password: string) =>
    password.length >= 8 &&
    RegExp(/[A-Z]/).test(password) &&
    RegExp(/[0-9]/).test(password),
};
