export interface User {
  _id: string;
  userId: number;
  email: string;
  name: string;
  phone: string;
  address?: string;
  country?: string;
  state?: string | null;
  city?: string;
  zip?: string;
  image?: string;
  balance: number;
  kycStatus: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  membershipTier: string;
  provider: string;
  otpByPass: boolean;
  referralCode: string;
  referralEarning: number;
  totalSpent: number;
  providerId?: string;
  dob?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  token: string;
  requiredOTP: boolean;
}

export interface VerifyOTPResponse extends User {
  status: string;
  token: string;
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
