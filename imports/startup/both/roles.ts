import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { RoleType, RoleNameType } from './globalTypes';

export const roleNames: RoleNameType = {
  ADMIN: 'admin',
  ADMIN_OPERATOR: 'admin operator',
  DISTRIBUTOR: 'distributor',
  PROMOTER: 'promoter',
  AGENT: 'agent',
};

const isInRole = (userId: string, role: string): boolean => {
  return Roles.userIsInRole(userId, [role], 'global_group');
};

export const Role: RoleType = {
  ...roleNames,
  GLOBAL_GROUP: 'global_group',
  isRoot(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.ADMIN);
  },
  isAdmin(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.ADMIN) || isInRole(userId, Role.ADMIN_OPERATOR);
  },
  isAdminOperator(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.ADMIN_OPERATOR);
  },
  isDistributor(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.DISTRIBUTOR);
  },
  isPromoter(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.PROMOTER);
  },
  isAgent(userId) {
    const id = userId || Meteor.userId();
    return isInRole(id, Role.AGENT);
  },
};

if (Meteor.isClient) {
  Template.registerHelper('isRoot', function (id) {
    return Role.isRoot(id);
  });

  Template.registerHelper('isAdmin', function () {
    return Role.isAdmin() || Role.isAdminOperator();
  });

  Template.registerHelper('isAgent', function () {
    return Role.isAgent();
  });
}

if (Meteor.isServer) {
  Meteor.publish(null, function () {
    if (this.userId) {
      return Meteor['roleAssignment'].find({ 'user._id': this.userId });
    } else {
      this.ready();
    }
  });
}

export const changeUserRolesTo = (userId: string, newRole: string): void => {
  return Roles.setUserRoles(userId, [Role[newRole]], Role.GLOBAL_GROUP);
};
