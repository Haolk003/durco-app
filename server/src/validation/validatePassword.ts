import * as Joi from "joi";

function validatePassword(password: string): boolean {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
      .required(),
  });
  const { error } = schema.validate({ password });
  return !error; // Trả về true nếu không có lỗi
}
export default validatePassword;
