import { CredentialsType } from '../both/globalTypes';

export const validateCredentials = ({ user, password }: CredentialsType) => {
  const { apiCredentials } = Meteor.settings.private;
  if (user !== apiCredentials.user || password !== apiCredentials.password)
    throw new Error('invalid credentials');
};