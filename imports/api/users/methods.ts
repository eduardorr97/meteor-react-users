import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { EmployeeType } from './schema';
import { Employees } from './users';
import { Role } from '../../startup/both/roles';
import { validateCredentials } from '../../startup/server/utils';
import { CredentialsType } from '../../startup/both/globalTypes';
import { capitalize } from '../../startup/both/utils';

type EmployeeArgs = {
  employee: EmployeeType;
};

const validateUserIsAllowed = (userId: string) => {
  if (!userId) {
    throw new Error('not allowed, no userId logged in');
  }

  const isAdmin = Role.isAdmin(userId);
  if (!isAdmin) throw new Error('not allowed, logged in user is not admin');
};

Meteor.methods({
  'employees.create'(credentials: CredentialsType, { employee }: EmployeeArgs) {
    this.unblock();
    check(employee, Object);

    try {
      validateCredentials(credentials);
    } catch (e) {
      throw new Meteor.Error('employees.create.error', e.message);
    }

    try {
      if (employee.role === Role.DISTRIBUTOR) {
        const distributor = Employees.findOne({ role: Role.DISTRIBUTOR });
        if (distributor) {
          throw new Error(
            'This company already has one employee with role DISTRIBUTOR'
          );
        }
      }

      const userCredentials = {
        email: employee.email,
        password: Random.id(),
      };

      const userId = Accounts.createUser({
        ...userCredentials,
        profile: {
          firstName: capitalize(employee.firstName),
          lastName: capitalize(employee.lastName),
          role: employee.role,
          active: employee.active,
        },
      });

      const role =
        employee.role === Role.ADMIN_OPERATOR
          ? 'admin_operator'
          : employee.role;

      Roles.addUsersToRoles(
        userId,
        Role[role.toUpperCase()],
        Role.GLOBAL_GROUP
      );

      const employeeId = Employees.insert({ ...employee, userId });

      Meteor.call(
        'authorizedMethodCall',
        'sendPasswordToNewUser',
        userCredentials,
        (error) => {
          if (error) throw new Error(error);
        }
      );
      return employeeId;
    } catch (error) {
      // If error remove USER if it was created
      Meteor.users.remove({ 'emails[0].address': employee.email });

      throw new Meteor.Error('employees.create.error', error.message);
    }
  },
  'employees.update'(credentials: CredentialsType, { employee }: EmployeeArgs) {
    this.unblock();
    check(employee, Object);

    try {
      validateCredentials(credentials);
      validateUserIsAllowed(this.userId);

      const employeeId = Employees.update(
        { _id: employee._id },
        { $set: employee }
      );

      const userId = employee.userId;
      const role =
        employee.role === Role.ADMIN_OPERATOR
          ? 'admin_operator'
          : employee.role;

      Roles.setUserRoles(userId, Role[role.toUpperCase()], Role.GLOBAL_GROUP);

      Meteor.users.update(
        { _id: userId },
        {
          $set: {
            profile: {
              firstName: capitalize(employee.firstName),
              lastName: capitalize(employee.lastName),
              role: employee.role,
              active: employee.active,
            },
          },
        }
      );
      return employeeId;
    } catch (error) {
      throw new Meteor.Error('employees.update.error', error.message);
    }
  },
  'employees.remove'(
    credentials: CredentialsType,
    { employeeId }: { employeeId: string }
  ) {
    check(credentials, Object);
    try {
      validateCredentials(credentials);
    } catch (error) {
      throw new Meteor.Error('employees.remove.error', error.message);
    }

    const employee = Employees.findOne({ _id: employeeId });

    Meteor['roleAssignment'].remove({ user: { _id: employee.userId } });
    Meteor.users.remove({ _id: employee.userId });

    return Employees.remove({ _id: employeeId });
  },
});
