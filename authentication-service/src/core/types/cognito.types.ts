export type CustomUserAttributes = {
  role: string;
  companyName: string;
  companyId: string;
  companyRole: string;
  officeName: string;
  licenceNum: string;
};

export type SignupParams = {
  email: string;
  password: string;
  role: string;
  companyName: string;
  companyId: string;
  companyRole: string;
  officeName: string;
  licenceNum: string;
  secretHash: string;
  clientId: string;
};

export type LoginParams = {
  clientId: string;
  username: string;
  password: string;
  secretHash: string;
};

export type RefreshParams = {
  clientId: string;
  secretHash: string;
  refreshToken: string;
};
