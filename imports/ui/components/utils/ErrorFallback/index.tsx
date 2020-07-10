import React from 'react';
import { Grid, Typography } from '@material-ui/core';

type Props = {
  error?: Error;
  componentStack?: string;
};

const ErrorFallback = ({ error, componentStack }: Props) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justify="center"
      direction="column"
    >
      <Grid item xs={12}>
        <Typography component="p" variant="h4">
          An Error Ocurred
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="p" variant="body1" color="secondary">
          {error.message}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography component="p" variant="body2">
          {componentStack}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorFallback;
