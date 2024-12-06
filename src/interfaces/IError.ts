export interface ICustomError<T> {
  message: string;
  status: number;
  code?: T;
}
