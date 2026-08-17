export interface User {
  id: string;
  token: string;
  email: string;
  createdAt?: string;
  isLogin?: boolean;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  id: string;
  token: string;
}
