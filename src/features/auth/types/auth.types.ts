
import {
  type FieldErrors,
  type FieldValues,
  type UseFormRegisterReturn,
} from "react-hook-form";

export interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface InputFieldsProps<T extends FieldValues> {
  htmlFor: string;
  type?: string;
  name?: keyof T;
  placeholder: string;
  register: UseFormRegisterReturn
  errors: FieldErrors<T> 
}

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export interface UserRegisterRequest {
  email: string;
  password: string;
}

export interface ModalAuthProps {
  message: string;
  setShowModalAuth: (key: boolean) => void;
};

export interface ResetPasswordFormValues {
  newPassword: string;
  newConfirmPassword: string;
}
