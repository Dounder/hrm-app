export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  username: string;
  email: string;
  roles: Role[];
  id: number;
  createdAt: Date;
  updatedAt: null | Date;
  deletedAt: null | Date;
}

export interface Role {
  id: number;
  name: string;
}
