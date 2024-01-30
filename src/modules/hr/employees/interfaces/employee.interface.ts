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
  salary: number | null;
  dateHired: string;
  extraHourRate: number | null;
  departmentId: number;
  positionId: number;
}
