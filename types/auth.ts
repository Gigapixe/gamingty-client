export interface User {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  // Add other user fields as needed
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  requiredOTP: boolean;
  user?: User;
}

export interface VerifyOTPResponse {
  status: string;
  message: string;
  token: string;
  user?: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  tempToken: string | null; // For OTP flow
  tempEmail: string | null; // For OTP flow
  setAuth: (user: User, token: string) => void;
  setTempAuth: (email: string, token: string) => void;
  clearTempAuth: () => void;
  logout: () => void;
}
