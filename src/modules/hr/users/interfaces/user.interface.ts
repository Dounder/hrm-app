export interface User {
  username: string;
  email: string;
  roles: Roles[];
  id: number;
  createdAt: Date;
  updatedAt: null | Date;
  deletedAt: null | Date;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface UserToUpdate {
  id: number;
  password: string | null;
  username: string;
  email: string;
  roles: Roles[];
}

export interface Roles {
  id: number;
  name: string;
}

export enum UserRole {
  Admin = 1,
  User = 2,
  Guest = 3,
  Manager = 4,
  Employee = 5,
}
