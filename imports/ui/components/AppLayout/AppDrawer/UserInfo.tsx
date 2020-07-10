import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Avatar } from '@material-ui/core';
import { Context } from '../../../../startup/client/context';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarContainer: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    avatar: {
      color: theme.palette.getContrastText(indigo[500]),
      backgroundColor: indigo[500],
      marginBottom: theme.spacing(1),
    },
    avatarName: {
      textTransform: 'capitalize',
    },
    avatarRole: {
      textTransform: 'capitalize',
    },
  })
);

export const UserInfo = () => {
  const classes = useStyles();

  const context = useContext(Context);
  const { currentEmployee, currentUserRole } = context;

  const userFullName = currentEmployee
    ? `${currentEmployee.firstName} ${currentEmployee.lastName}`
    : '';
  const currentUserRoleName = currentUserRole && currentUserRole.role._id;

  const userInitials = currentEmployee
    ? `${currentEmployee.firstName.charAt(0)}${currentEmployee.lastName.charAt(
        0
      )}`
    : '';

  return currentEmployee ? (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.avatarContainer}
    >
      <Avatar className={classes.avatar}>{userInitials}</Avatar>
      <Typography component="p" variant="body1" className={classes.avatarName}>
        {userFullName}
      </Typography>
      <Typography
        component="p"
        variant="caption"
        className={classes.avatarRole}
      >
        {currentUserRoleName}
      </Typography>
    </Grid>
  ) : (
    <></>
  );
};
