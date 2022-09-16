interface IUser {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpUserType = Omit<IUser, "id">;
type CreateUserType = Omit<IUser, "id" | "confirmPassword">;

export { IUser, SignUpUserType, CreateUserType };
