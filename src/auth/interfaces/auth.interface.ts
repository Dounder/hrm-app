import { User } from 'src/users';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
