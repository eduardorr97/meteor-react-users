import { Employees } from '../users';
import { EmployeeType } from '../schema';
import { PublicationSelector } from '../../../startup/both/globalTypes';

Meteor.publish(
  'employees.selector.options',
  ({
    selector = {},
    fields = {},
    sort = { createdAt: -1 },
  }: PublicationSelector<EmployeeType>) =>
    Employees.find(selector, { fields, sort })
);

Meteor.publish(
  'users.selector.options',
  ({
    selector = {},
    fields = {},
  }: PublicationSelector<Meteor.User>): Mongo.Cursor<Meteor.User> =>
    Meteor.users.find(selector, { fields })
);

Meteor.publish(
  'external.employees.all',
  ({ selector = {} }): Mongo.Cursor<Meteor.User> => Meteor.users.find(selector)
);
