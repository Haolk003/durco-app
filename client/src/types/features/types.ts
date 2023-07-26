export interface ICategory {
  name: string;
  _id: string;
}
export interface IColor {
  name: string;
  code: string;
}
export interface Iproduct {
  banner: string;
  imageList: [string];
  make?: string;
  model?: string;
  year?: string;
  engine?: string;
  price: number;
  sold: number;
  quanlity: number;
  sale: {
    startDate: Date | null;
    endDate: Date | null;
    discount: number;
  };
  title: string;
  status: string;
  sku: string;
  description?: string;
  category: ICategory;
  color: IColor;
}
export interface IUser {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export interface IBrand {
  name: string;
  logo: string;
}
