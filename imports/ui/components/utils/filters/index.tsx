import React from 'react';
import {
  TextField,
  FormControlLabel,
  Switch,
  makeStyles,
  createStyles,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginRight: 0,
    },
  })
);

type BaseFilterProps = {
  name: string;
  value: string;
  onValueChange(name: string, value: string | boolean | number): void;
};

type TextFilterProps = BaseFilterProps & { label: string };

export const TextFilter = ({
  name,
  label,
  value,
  onValueChange,
}: TextFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onValueChange(name, e.target.value);

  return (
    <TextField
      size="small"
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      style={{ width: '100%' }}
    />
  );
};

type SelectFilterProps = BaseFilterProps & {
  label: string;
  options: string[];
};

export const SelectFilter = ({
  name,
  label,
  value,
  options,
  onValueChange,
}: SelectFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onValueChange(name, e.target.value);

  return (
    <TextField
      select
      size="small"
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      style={{ width: '100%' }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

type NumberFilterProps = Omit<BaseFilterProps, 'value'> & {
  label: string;
  value: number;
  min?: number;
  max?: number;
};
export const NumberFilter = ({
  name,
  label,
  value,
  min,
  max,
  onValueChange,
}: NumberFilterProps) => {
  const handleChange = (e) => onValueChange(name, parseInt(e.target.value));
  return (
    <TextField
      type="number"
      size="small"
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      style={{ width: '100%' }}
      inputProps={{
        min,
        max,
      }}
    />
  );
};

export const DateFilter = ({ name, value, onValueChange }: BaseFilterProps) => {
  const handleChange = (e) => {
    onValueChange(name, e.target.value);
  };
  return (
    <TextField
      type="date"
      size="small"
      label="From"
      variant="outlined"
      name={name}
      value={value}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
    />
  );
};

type SwitchFilterProps = {
  value: string;
  checked: boolean;
  onValueChange(name: string, value: string): void;
};

export const SwitchFilter = ({
  value,
  checked,
  onValueChange,
}: SwitchFilterProps) => {
  const classes = useStyles();

  const label = `${value.charAt(0).toUpperCase()}${value.substring(1)}`;
  const handleSwitchChange = (e) => {
    onValueChange(value, e.target.checked);
  };

  return (
    <FormControlLabel
      value={value}
      label={label}
      labelPlacement="bottom"
      className={classes.root}
      control={
        <Switch
          color="primary"
          size="small"
          onChange={handleSwitchChange}
          checked={checked}
        />
      }
    />
  );
};
