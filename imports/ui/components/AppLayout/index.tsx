import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import { Breadcrumbs, Divider } from '@material-ui/core';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../../startup/client/context';
import { ContextType, RoleAsignment } from '../../../startup/both/globalTypes';
import { useTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../../api/users/users';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../utils/ErrorFallback';
import { EmployeeType } from '../../../api/users/schema';

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: theme.spacing(10),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(10),
      marginLeft: 215,
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  })
);

const collections = {
  users: Employees,
};

const AppLayout = ({ children }: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const { _id } = useParams();
  const paths = location.pathname.split('/');

  const currentUser = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const handle = Meteor.subscribe('employees.selector.options', {
      selector: { userId: currentUser && currentUser._id },
    });
    return handle.ready();
  }, [currentUser]);

  const employeeAndRole = useTracker(() => {
    const currentUserRole: RoleAsignment = Meteor['roleAssignment'].findOne();
    const currentEmployee = Employees.findOne({
      userId: currentUser && currentUser._id,
    });
    return {
      currentUserRole,
      currentEmployee,
    };
  }, [currentUser]);

  const contextValue: ContextType = {
    ...employeeAndRole,
    currentUser,
  };

  const detailObject = useTracker(
    () =>
      collections[paths[1]]
        ? collections[paths[1]].findOne({ _id })
        : undefined,
    []
  );

  const objectName = {
    users(employee: EmployeeType) {
      return `${employee.firstName} ${employee.lastName}`;
    },
  };

  const getObjectName = (type: string) =>
    (detailObject && objectName[type](detailObject)) || '';

  const getBreadcrumbs = () => {
    return paths.map((pathname, index) => {
      if (!pathname) return;

      //if it matches is an Id, do something
      const link = pathname.match(/^([2-9A-Za-z]{17,})$/)
        ? getObjectName(paths[1])
        : pathname;

      // render a <Link /> if is not the last pathname
      const isLink = index + 1 !== paths.length;

      return isLink && link !== 'details' ? (
        <Link color="inherit" to={`/${link}`} key={link}>
          {link.toUpperCase()}
        </Link>
      ) : (
        <span key={link}>{link.toUpperCase()}</span>
      );
    });
  };

  return (
    <>
      <Context.Provider value={contextValue}>
        <CssBaseline />
        <AppBar />
        <AppDrawer />
        <div className={classes.content}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              {getBreadcrumbs()}
            </Breadcrumbs>
            <Divider className={classes.divider} />
            {children}
          </ErrorBoundary>
        </div>
      </Context.Provider>
    </>
  );
};

export default AppLayout;
