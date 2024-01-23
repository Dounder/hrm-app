export interface User {
  username: string;
  email: string;
  roles: Roles[];
  id: number;
  createdAt: Date;
  updatedAt: null | Date;
  deletedAt: null | Date;
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
