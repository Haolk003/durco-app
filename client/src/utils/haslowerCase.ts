const hasLowerCase = (text: string) => {
  const uppercaseRegex = /[a-z]/;
  return uppercaseRegex.test(text);
};
export default hasLowerCase;
