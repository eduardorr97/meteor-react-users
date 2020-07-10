import React, { useState, ChangeEvent } from 'react';
import {
  Grid,
  Drawer,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Divider,
  IconButton,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  MenuItem,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { roleNames } from '../../../../startup/both/roles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterIconContainer: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    searchInput: {
      marginRight: theme.spacing(2),
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
    filterField: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      width: '100%',
    },
    clearButton: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  })
);

type Props = {
  onInputChange(fieldSelector: object | string): void;
  onClearFilters(): void;
};

type FieldsState = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  workPhone: string;
  active: boolean;
};

const { ADMIN_OPERATOR, DISTRIBUTOR, PROMOTER, AGENT } = roleNames;
const roleValues = Object.values([
  ADMIN_OPERATOR,
  DISTRIBUTOR,
  PROMOTER,
  AGENT,
]).map((name) => ({ label: name, value: name, key: name }));

const initialInputValues: FieldsState = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  workPhone: '',
  active: true,
};

const EmployeesFilter = ({ onInputChange, onClearFilters }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FieldsState>(initialInputValues);

  const updateLocalStateFieldValue = (name: string, value: string | boolean) =>
    setState({ ...state, [name]: value });

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLocalStateFieldValue(name, value);

    //fix for the phones starting with '+' sign
    const safeVal = name === 'workPhone' ? `\\${value}` : value;

    const fieldSelector = value ? { [name]: { $regex: safeVal } } : name;
    onInputChange(fieldSelector);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === 'true' ? true : value === '' ? '' : false;
    updateLocalStateFieldValue(name, parsedValue);

    const fieldSelector = value ? { [name]: parsedValue } : name;
    onInputChange(fieldSelector);
  };

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
                filter/ user
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                size="small"
                variant="outlined"
                className={classes.filterField}
                autoComplete="no"
                value={state.firstName}
                onChange={handleStringChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                size="small"
                variant="outlined"
                className={classes.filterField}
                autoComplete="no"
                value={state.lastName}
                onChange={handleStringChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email"
                size="small"
                variant="outlined"
                className={classes.filterField}
                autoComplete="no"
                value={state.email}
                onChange={handleStringChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="workPhone"
                label="Phone"
                size="small"
                variant="outlined"
                className={classes.filterField}
                autoComplete="no"
                value={state.workPhone}
                onChange={handleStringChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                name="role"
                label="Role"
                size="small"
                variant="outlined"
                className={classes.filterField}
                autoComplete="no"
                value={state.role}
                onChange={handleStringChange}
              >
                {roleValues.map((role) => (
                  <MenuItem key={role.key} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormLabel component="legend">Status</FormLabel>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                name="active"
                aria-label="active"
                value={state.active}
                onChange={handleRadioChange}
              >
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Active"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Inactive"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
};

export default EmployeesFilter;
