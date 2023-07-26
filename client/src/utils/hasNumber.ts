const hasNumber = (text: string) => {
  const uppercaseRegex = /[0-9]/;
  return uppercaseRegex.test(text);
};
export default hasNumber;
