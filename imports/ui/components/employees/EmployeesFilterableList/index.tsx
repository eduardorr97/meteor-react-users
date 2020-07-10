import React, { useState, useContext } from 'react';
import { Employees } from '../../../../api/users/users';
import { EmployeeType } from '../../../../api/users/schema';
import EmployeeCard from '../../../components/employees/EmployeeCard';
import CollectionList from '../../../components/utils/CollectionList';
import { PaginationSelector } from '../../../../startup/both/globalTypes';
import { Role } from '../../../../startup/both/roles';
import { Context } from '../../../../startup/client/context';
import CollectionFilters from '../../utils/CollectionFilters';
import { Grid } from '@material-ui/core';
import { TextFilter, SelectFilter } from '../../utils/filters';

const authorizedToAdd: string[] = [
  Role.ADMIN,
  Role.ADMIN_OPERATOR,
  Role.DISTRIBUTOR,
  Role.PROMOTER,
];

type State = {
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  workPhone?: string;
  active?: boolean;
};

const getSelector = (state: State) => {
  const stringVals: State = {};
  Object.keys(state).forEach((key) => {
    if (state[key] !== '' && typeof state[key] === 'string') {
      stringVals[key] = state[key];
    }
  });

  const selector: Mongo.Selector<EmployeeType> = { ...stringVals };
  return selector;
};

const EmployeesFilterableList = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    workPhone: '',
    active: true,
  };
  const initialSelector = { active: true, role: { $ne: Role.ADMIN } };

  const [state, setState] = useState<State>(initialState);
  const selector = { ...initialSelector, ...getSelector(state) };

  const { currentUserRole } = useContext(Context);

  const canAddEmployees =
    currentUserRole && authorizedToAdd.includes(currentUserRole.role._id);

  const subscriptionArgs: PaginationSelector<EmployeeType> = {
    selector,
    fields: {
      firstName: 1,
      lastName: 1,
      role: 1,
      email: 1,
      workPhone: 1,
      active: 1,
    },
  };

  const handleValueChange = (name: string, value: string | boolean) =>
    setState({ ...state, [name]: value });

  const handleClearFilters = () => setState(initialState);

  return (
    <>
      <CollectionFilters name="employees" onClearFilters={handleClearFilters}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextFilter
              name="firstName"
              label="First Name"
              value={state.firstName || ''}
              onValueChange={handleValueChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFilter
              name="lastName"
              label="Last Name"
              value={state.lastName || ''}
              onValueChange={handleValueChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextFilter
              name="email"
              label="Email"
              value={state.email || ''}
              onValueChange={handleValueChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFilter
              name="workPhone"
              label="Phone"
              value={state.workPhone || ''}
              onValueChange={handleValueChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFilter
              name="role"
              label="Role"
              value={state.role || ''}
              options={[
                Role.ADMIN_OPERATOR,
                Role.DISTRIBUTOR,
                Role.PROMOTER,
                Role.AGENT,
              ]}
              onValueChange={handleValueChange}
            />
          </Grid>
        </Grid>
      </CollectionFilters>
      <CollectionList
        type="employees"
        withAdd={canAddEmployees}
        collection={Employees}
        Component={EmployeeCard}
        subscriptionArgs={subscriptionArgs}
      />
    </>
  );
};

export default EmployeesFilterableList;
