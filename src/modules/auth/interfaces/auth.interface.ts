import { User } from 'src/modules/hr/users';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
