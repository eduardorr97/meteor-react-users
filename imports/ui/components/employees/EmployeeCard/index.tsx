import React from 'react';
import {
  CardContent,
  Card,
  Typography,
  makeStyles,
  createStyles,
  Grid,
  Divider,
  colors,
  Theme,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { EmployeeType } from '../../../../api/users/schema';
import { useHistory } from 'react-router';
import StarsIcon from '@material-ui/icons/Stars';
import StarRateIcon from '@material-ui/icons/StarRate';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { roleNames } from '../../../../startup/both/roles';

const iconByRole = {
  [roleNames.ADMIN]: StarsIcon,
  [roleNames.ADMIN_OPERATOR]: StarRateIcon,
  [roleNames.DISTRIBUTOR]: SupervisedUserCircleIcon,
  [roleNames.PROMOTER]: AccountCircleIcon,
  [roleNames.AGENT]: AccountCircleIcon,
};
const EmployeeIcon = ({ role, color }: { role: string; color: string }) => {
  const IconComponent = iconByRole[role];
  return <IconComponent color={color} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    baseCard: {
      width: 225,
      height: 270,
      borderRadius: 10,
      transition: 'all ease .2s',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: `0 4px 5px ${colors.grey[400]}`,
      },
    },
    fullName: {
      fontSize: '18px',
      marginBottom: theme.spacing(2),
    },
    fieldContainer: {
      display: 'flex',
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
      color: colors.grey[800],
    },
    field: {
      marginLeft: '5px',
      fontSize: '14px',
    },
  })
);

interface Props {
  employee: EmployeeType;
}

const EmployeesCard = ({ employee }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const getFullName = () => {
    return `${employee.firstName} ${employee.lastName}`;
  };

  return (
    <Card
      className={classes.baseCard}
      onClick={() => history.push(`users/${employee._id}`)}
    >
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <EmployeeIcon
              role={employee.role}
              color={employee.active ? 'primary' : 'inherit'}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.fullName}>
              {getFullName()}
            </Typography>
          </Grid>
          <Divider style={{ width: '100%' }} />
          <Grid item className={classes.fieldContainer}>
            <EmailIcon />
            <Typography className={classes.field}>{employee.email}</Typography>
          </Grid>
          <Grid item className={classes.fieldContainer}>
            <PhoneIcon />
            <Typography className={classes.field}>
              {employee.workPhone}
            </Typography>
          </Grid>
          <Grid item className={classes.fieldContainer}>
            <VpnKeyIcon />
            <Typography
              className={classes.field}
              style={{ textTransform: 'capitalize' }}
            >
              {employee.role}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeesCard;
