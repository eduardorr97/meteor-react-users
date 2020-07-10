import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { colors, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    errorContainer: {
      marginBottom: theme.spacing(2),
      color: colors.red[500],
      textAlign: 'center',
    },
  })
);

type Props = {
  className?: string;
};

const LoginForm = ({ className }: Props) => {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) setError('Wrong credentials');

    Meteor.loginWithPassword(email, password, (error) =>
      error
        ? setError(`Login failed, please try again`)
        : history.push('/users')
    );
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Grid container direction="column" justify="center" alignContent="center">
        {error && (
          <Typography
            className={classes.errorContainer}
            variant="body1"
            component="p"
          >
            {error}
          </Typography>
        )}
        <TextField
          required
          label="email"
          variant="outlined"
          className={classes.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          label="Password"
          variant="outlined"
          className={classes.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
        >
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
