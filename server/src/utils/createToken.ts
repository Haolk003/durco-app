import jwt from "jsonwebtoken";

const createJwt = (id: string, role: string) => {
  try {
    const accessToken = jwt.sign(
      { _id: id, role: role },
      `${process.env.JWT_KEY}`,
      { expiresIn: `${process.env.ACCESS_TOKEN_EXPRIES}` }
    );
    const refeshToken = jwt.sign({ _id: id, role }, `${process.env.JWT_KEY}`, {
      expiresIn: `${process.env.REFESH_TOKEN_EXPRIES}`,
    });
    return { accessToken, refeshToken };
  } catch (err: any) {
    throw Error(err);
  }
};
export default createJwt;
