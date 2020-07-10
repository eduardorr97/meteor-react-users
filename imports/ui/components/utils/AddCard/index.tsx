import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  createStyles,
  colors,
  Theme,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    addCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${theme.palette.primary.main}`,
      userSelect: 'none',
    },
    cardIcon: {
      color: theme.palette.primary.main,
      fontSize: 50,
    },
    cardText: {
      color: theme.palette.primary.main,
      fontSize: 20,
      textTransform: 'uppercase',
    },
  })
);

type Props = {
  type: 'employees' | 'offers' | 'companies' | 'certificates';
};

const AddCard = ({ type }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const parsedType = type === 'employees' ? 'users' : type;

  return (
    <Grid item>
      <Box
        className={`${classes.baseCard} ${classes.addCard}`}
        onClick={() => history.push(`/${parsedType}/add`)}
      >
        <AddCircleIcon className={classes.cardIcon} />
        <Typography className={classes.cardText}>{parsedType}</Typography>
      </Box>
    </Grid>
  );
};

export default AddCard;
