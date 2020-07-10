import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '../../utils/Icon';
import { Divider } from '@material-ui/core';
import { UserInfo } from './UserInfo';
import { routes } from '../../../../startup/client/routes';
import { RouteType } from '../../../../startup/both/globalTypes';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

const AppDrawer = () => {
  const classes = useStyles();
  const history = useHistory();

  const selectedRoute = (href: string) =>
    history.location.pathname.startsWith(href);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <UserInfo />
      <Divider />
      <List>
        {routes.map((route: RouteType) => (
          <ListItem
            button
            key={route.title}
            selected={selectedRoute(route.href)}
            onClick={() => history.push(route.href)}
          >
            <ListItemIcon>
              <Icon
                Component={route.icon}
                color={selectedRoute(route.href) ? 'primary' : 'inherit'}
              />
            </ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
