import joi from "joi";
import { CreateUserType, SignUpUserType } from "../types/authTypes";
const signUpSchema = joi.object<SignUpUserType>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

const signInSchema = joi.object<CreateUserType>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { signUpSchema, signInSchema };
