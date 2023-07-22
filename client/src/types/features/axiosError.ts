import { AxiosError } from "axios";
export interface MyAxiosError<T = any> extends AxiosError<T> {}
