export interface UserJWTI {
  sub: string;
  email: string;
  username?: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}
