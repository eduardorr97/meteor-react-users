import React from 'react';
import { Typography, colors } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const NoElements = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <RemoveCircleIcon fontSize="large" />
      <Typography
        component="h2"
        variant="h4"
        style={{ color: colors.grey[700] }}
      >
        Nothing to display
      </Typography>
      <Typography
        component="p"
        variant="body1"
        style={{ color: colors.grey[500] }}
      >
        There are no elements to show
      </Typography>
    </div>
  );
};

export default NoElements;
