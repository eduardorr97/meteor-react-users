import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { Role, roleNames } from '../both/roles';
import { insertEmployee } from '../../api/users/utils';

Meteor.startup(() => {
  let initialUserId = '';

  // if not roles create all roles
  if (Meteor['roleAssignment'].find().count() === 0) {
    console.info('creating roles');
    Object.values(roleNames).map((roleName) => {
      Roles.createRole(roleName);
    });
    console.info('created roles');
  }

  if (Meteor.users.find().count() === 0) {
    console.info('creating admin');
    //if no users create admin user
    const adminObject = {
      email: Meteor.settings.private.emailToSendRootPassword,
      password: Random.id(),
      profile: {
        firstName: 'Admin',
        lastName: 'Root',
        role: Role.ADMIN,
        active: true,
      },
    };

    initialUserId = Accounts.createUser(adminObject);

    Roles.addUsersToRoles(initialUserId, Role.ADMIN, 'global_group');

    const adminEmployee = {
      ...adminObject.profile,
      userId: initialUserId,
      email: adminObject.email,
      workPhone: '+55 555 555 5555',
      country: 'Mexico',
      state: 'VR',
      city: 'VR',
      address: 'VR',
      zipCode: 'VR',
    };

    insertEmployee(adminEmployee);

    Meteor.call(
      'sendPasswordToNewAdmin',
      adminObject.password,
      (error: Meteor.Error) =>
        console.info(
          error
            ? error.message
            : `admin created ${adminObject.email}, password: ${adminObject.password}`
        )
    );
  }
});
