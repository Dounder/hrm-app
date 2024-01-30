export interface Employee {
  dateHired: Date;
  extraHourRate: number;
  department: Department;
  position: Department;
  name: string;
  code: string;
  email: string;
  phone: string;
  salary: number;
  id: number;
  createdAt: Date;
  updatedAt: null | Date;
  deletedAt: null | Date;
}

export interface Department {
  id: number;
  name: string;
}

export type Position = Department;

export interface NewEmployee {
  name: string;
  email: string;
  phone: string;
  salary: number | string;
  dateHired: string;
  extraHourRate: number | string;
  departmentId: number | null;
  positionId: number | null;
}

export interface EmployeeToUpdate extends NewEmployee {
  id: number;
}

export interface AddEmployeeResponse {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  code: string;
  user: EmployeeUser;
}

export interface EmployeeUser {
  username: string;
  password: string;
}
