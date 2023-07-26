import { Response, Request, NextFunction } from "express";
import colorSerive from "../service/colorService";
import { colorSucc } from "../utils/responseMessage";

export const createColor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const newColor = await colorSerive.createColor(data.name, data.code);
    res
      .status(200)
      .json({ status: 200, data: newColor, message: colorSucc.SUC_1 });
  } catch (err) {
    next(err);
  }
};
export const updateColor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const updateColor = await colorSerive.updateColor(data.id, {
      name: data.name,
      code: data.code,
    });
    res
      .status(200)
      .json({ status: 200, data: updateColor, message: colorSucc.SUC_4 });
  } catch (err) {
    next(err);
  }
};
export const getAllColor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const colors = await colorSerive.getAllColor();
    res
      .status(200)
      .json({ status: 200, data: colors, message: colorSucc.SUC_2 });
  } catch (err) {
    next(err);
  }
};
export const deleteColor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteColor = await colorSerive.deleteColor(req.body.id);
    res
      .status(200)
      .json({ status: 200, data: deleteColor, message: colorSucc.SUC_5 });
  } catch (err) {
    next(err);
  }
};
