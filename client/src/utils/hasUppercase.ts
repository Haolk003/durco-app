const hasUppercase = (text: string) => {
  const uppercaseRegex = /[A-Z]/;
  return uppercaseRegex.test(text);
};
export default hasUppercase;
