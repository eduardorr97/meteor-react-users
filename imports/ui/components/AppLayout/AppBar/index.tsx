import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { useHistory } from 'react-router';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoutButton: {
      color: 'white',
    },
    imgContainer: {
      flexGrow: 1,
    },
    logo: {
      cursor: 'pointer',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

const AppBarComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    Accounts.logout(() => (window.location.href = '/login'));
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.imgContainer}>
            <Typography
              className={classes.logo}
              onClick={() => history.push('/users')}
              component="p"
              variant="h5"
            >
              Users App
            </Typography>
          </div>
          <IconButton>
            <Badge variant="dot" color="secondary">
              <NotificationsIcon className={classes.logoutButton} />
            </Badge>
          </IconButton>
          <IconButton className={classes.logoutButton} onClick={handleClick}>
            <ExitToAppRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
