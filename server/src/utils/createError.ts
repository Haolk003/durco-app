import createHttpError from "http-errors";
const createError = (status: number, message: string) => {
  const err = createHttpError(status | 500, message);
  // err.message = message || "SOMETHING WENT WRONG ";
  // err.status = status || 500;
  return err;
};
export default createError;
