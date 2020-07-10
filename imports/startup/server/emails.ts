import { check } from 'meteor/check';
import { validateCredentials } from './utils';
import { CredentialsType } from '../both/globalTypes';
//@ts-ignore
Email.setting = Meteor.settings.private.SES;

Meteor.methods({
  sendPasswordToNewAdmin(password: string) {
    this.unblock();
    check(password, String);

    try {
      const {
        public: { baseUrl },
        private: { emailToSendRootPassword },
      } = Meteor.settings;

      console.info(
        `Your user is: ${emailToSendRootPassword} and your password: ${password}, you can login at ${baseUrl}`
      );
      return;
    } catch (error) {
      console.error(error.message);
    }
  },
  sendPasswordToNewUser(
    credentials: CredentialsType,
    { password, email }: { password: string; email: string }
  ) {
    this.unblock();
    check(credentials, Object);
    check(password, String);
    check(email, String);

    try {
      validateCredentials(credentials);

      console.info(`New User: ${email}, password: ${password}`);

      const {
        public: { baseUrl },
      } = Meteor.settings;
      console.info(
        `Hello, Here's your new user: ${email} and password: ${password}, now you can use it to login at ${baseUrl}.`
      );
      return;
    } catch (error) {
      throw new Meteor.Error('emailDeliveryError', error.message);
    }
  },
});
