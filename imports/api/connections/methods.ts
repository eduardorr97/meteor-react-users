import { CredentialsType } from '../../startup/both/globalTypes';

Meteor.methods({
  authorizedMethodCall(methodName: string, ...args) {
    return new Promise((resolve, reject) => {
      const {
        apiCredentials,
      }: { apiCredentials: CredentialsType } = Meteor.settings.private;

      Meteor.call(
        methodName,
        apiCredentials,
        ...args,
        (error: Meteor.Error, result) => {
          if (error) reject(error);
          if (result) resolve(result);
        }
      );
    });
  },
});
