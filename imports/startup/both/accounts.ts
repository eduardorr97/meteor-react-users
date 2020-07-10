//@ts-ignore
AccountsTemplates.configure({
  forbidClientAccountCreation: true,
  showPlaceholders: false,
  texts: {
    errors: {
      loginForbidden: 'Wrong credentials',
    },
  },
});

Accounts.onLoginFailure(function ({ allowed }) {
  if (!allowed) {
    if (Meteor.isClient) {
      window.location.href = '/login';
    }
    return false;
  }
});