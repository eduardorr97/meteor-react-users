import { Employees } from '../../users/users';

const collections = {
  employees: Employees,
};

Meteor.publish('collection.counts', function (type, { selector = {} }) {
  let count = 0;
  let initializing = true;

  const collection = collections[type];

  const handle = collection
    .find(selector, { fields: { _id: 1 } })
    .observeChanges({
      added: () => {
        count += 1;
        if (!initializing) {
          this.changed('counts', '', { count });
        }
      },
      removed: () => {
        count -= 1;
        this.changed('counts', '', { count });
      },
    });

  initializing = false;

  this.added('counts', '', { count });
  this.ready();

  this.onStop(() => handle.stop());
});
