import React, { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import NotFoundPage from '../../ui/pages/404';
import EmployeesListPage from '../../ui/pages/employees/list';
import EmployeesAddPage from '../../ui/pages/employees/add';
import EmployeesDetailsPage from '../../ui/pages/employees/details';
import LoginPage from '../../ui/pages/login';

export const renderRoutes = () => {
  const renderComponent = (Component): ReactNode => {
    return Meteor.userId() ? <Component /> : <Redirect to="/login" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/users" />} />
            <Route
              path="/users/add"
              render={() => renderComponent(EmployeesAddPage)}
            />
            <Route
              path="/users/:_id"
              render={() => renderComponent(EmployeesDetailsPage)}
            />
            <Route
              path="/users"
              render={() => renderComponent(EmployeesListPage)}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
