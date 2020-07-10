import React, { useState } from 'react';
import {
  Grid,
  Drawer,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterIconContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    drawerPaper: {
      width: 400,
    },
    filterContainer: {
      padding: theme.spacing(2),
    },
    filterTitle: {
      flexGrow: 1,
      textTransform: 'uppercase',
    },
    clearButton: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  })
);

type Props = {
  name: string;
  onClearFilters(): void;
  children: React.ReactNode;
};

export default function CollectionFilters({
  name,
  onClearFilters,
  children,
}: Props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid
        container
        justify="flex-end"
        className={classes.filterIconContainer}
      >
        <Grid item>
          <IconButton onClick={() => setOpen(true)} color="primary">
            <FilterListIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Drawer
        anchor="left"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.filterContainer}>
          <Grid container alignItems="center">
            <Grid item className={classes.filterTitle}>
              <Typography component="p" variant="body1">
                filter / {name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider style={{ marginBottom: 12 }} />
          {children}
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                className={classes.clearButton}
                startIcon={<DeleteIcon color="secondary" />}
                onClick={onClearFilters}
              >
                clear filters
              </Button>
            </Grid>
          </Grid>
        </div>
      </Drawer>
    </>
  );
}
