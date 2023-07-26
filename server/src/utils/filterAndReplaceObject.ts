import { pick } from "lodash";

const filterAndReplaceObject = (obj: {}) => {
  const filter = JSON.stringify(
    pick(obj, [
      "color",
      "category",
      "brand",
      "price",
      "make",
      "year",
      "model",
      "engine",
    ])
  );
  const replateObj = filter.replace(
    /\b(gt|gte|lte|lt)\b/g,
    (match: any) => `$${match}`
  );
  return JSON.parse(replateObj);
};

export default filterAndReplaceObject;
