export interface ILoginValues {
  username?: string;
  password?: string;
  token?: string;
}

export interface ILogin {
  message: ILoginValues;
  isLoading: boolean;
  status: string;
}
