import { Employees } from './users';
import { EmployeeType } from './schema';

export const getEmployeeByUserId = (userId: string) =>
  Employees.findOne({ userId });

export const insertEmployee = (employee: EmployeeType) =>
  Employees.insert(employee);
