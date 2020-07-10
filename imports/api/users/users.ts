import {
  globalBeforeInsertHook,
  globalBeforeUpdateHook,
} from '../../startup/both/utils';
import { EmployeeType, employeeSchema } from './schema';
import { Role } from '../../startup/both/roles';

export const Employees = new Mongo.Collection<EmployeeType>(`employees`);

// @ts-ignore
Employees.attachSchema(employeeSchema);

Employees.hookOptions.after.update = { fetchPrevious: false };

export const getEmployeeByUserId = (userId: string) =>
  Employees.findOne({ userId });

Employees.allow({
  insert() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
  update() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
  remove() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
});

Meteor.users.allow({
  insert() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
  update() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
  remove() {
    return Role.isAdmin() || Role.isAdminOperator();
  },
});

Employees.before.insert(globalBeforeInsertHook);

Employees.before.update(globalBeforeUpdateHook);

Employees.after.remove((userId, doc) => {
  Meteor.users.remove({ _id: doc.userId });
});
