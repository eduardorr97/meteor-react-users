import React, { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import {
  AutoForm,
  TextField,
  BoolField,
  SelectField,
  SubmitField,
  ErrorsField,
} from 'uniforms-material';
import {
  employeeSchemaBridge,
  EmployeeType,
} from '../../../../api/users/schema';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { roleNames, Role } from '../../../../startup/both/roles';
import ElementRemoveConfirmationDialog from '../../utils/alerts/ElementRemoveConfirmationDialog';
import { Context } from '../../../../startup/client/context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cancelButton: {
      marginRight: theme.spacing(2),
    },
  })
);

interface Props {
  model?: EmployeeType;
}

type StateType = {
  disabled: boolean;
  isSubmitting: boolean;
};

const { ADMIN_OPERATOR, DISTRIBUTOR, PROMOTER, AGENT } = roleNames;
const roleValues = Object.values([
  ADMIN_OPERATOR,
  DISTRIBUTOR,
  PROMOTER,
  AGENT,
]).map((name) => ({ label: name, value: name, key: name }));

const distributorAllowedRoles: string[] = [Role.PROMOTER, Role.AGENT];

const userCanDelete = (currentEmployee: EmployeeType, model: EmployeeType) => {
  if (!currentEmployee || !model) return false;

  if (currentEmployee.userId === model.userId) return false;

  switch (currentEmployee.role) {
    // AGENTS cannot delete other employees
    case Role.AGENT:
      return false;
    // PROMOTERS may delete only AGENTS
    case Role.PROMOTER:
      return model.role === Role.AGENT;
    // DISTRIBUTOR may delete only PROMOTERS and AGENTS
    case Role.DISTRIBUTOR:
      return distributorAllowedRoles.includes(model.role);
    case Role.ADMIN_OPERATOR:
      return model.role !== Role.ADMIN;
    default:
      return true;
  }
};

const userCanEdit = (currentEmployee: EmployeeType, model: EmployeeType) => {
  if (!currentEmployee || !model) return false;

  if (currentEmployee.userId === model.userId) return true;

  switch (currentEmployee.role) {
    //AGENTs may edit only themselves (covered by the previous if)

    //PROMOTERS may edit only themselves and AGENTS
    case Role.PROMOTER:
      return model.role === Role.AGENT;
    //DISTRIBUTORS may edit themselves, PROMOTERS and AGENT
    case Role.DISTRIBUTOR:
      return distributorAllowedRoles.includes(model.role);
    case Role.ADMIN_OPERATOR:
      return model.role !== Role.ADMIN;
    default:
      return true;
  }
};

const ManageEmployeesForm = ({ model }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { currentEmployee } = useContext(Context);

  const [state, setState] = useState<StateType>({
    disabled: model ? true : false,
    isSubmitting: false,
  });

  const emailDisabled = model ? true : false;

  const canEdit = userCanEdit(currentEmployee, model);
  const canDelete = userCanDelete(currentEmployee, model);

  const handleSubmit = (employee: EmployeeType) => {
    setState({ ...state, isSubmitting: true });
    const methodName = model ? 'employees.update' : 'employees.create';

    Meteor.call(
      'authorizedMethodCall',
      methodName,
      { employee },
      (error: Error) => {
        setState({ ...state, isSubmitting: true });
        if (error) {
          enqueueSnackbar(error.message, { variant: 'error' });
        } else {
          history.push('/users');
          const operation = model ? 'updated' : 'created';
          enqueueSnackbar(`Employee ${operation} correctly`, {
            variant: 'success',
          });
        }
      }
    );
  };

  const handleCancel = () => {
    model ? setState({ ...state, disabled: true }) : history.push('/users');
  };

  return (
    <>
      <AutoForm
        model={model}
        schema={employeeSchemaBridge}
        onSubmit={handleSubmit}
        disabled={state.disabled}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <SelectField name="role" variant="outlined" options={roleValues} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <BoolField
              name="active"
              appearance="toggle"
              color="primary"
              defaultValue={false}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField name="firstName" variant="outlined" />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField name="lastName" variant="outlined" />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <TextField
              name="email"
              variant="outlined"
              disabled={emailDisabled}
            />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <TextField name="workPhone" variant="outlined" />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <TextField name="mobilePhone" variant="outlined" />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <TextField name="homePhone" variant="outlined" />
          </Grid>
          <Grid item lg={8} xs={12}>
            <TextField name="address" variant="outlined" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField name="zipCode" variant="outlined" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <SelectField name="country" variant="outlined" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField name="state" variant="outlined" />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TextField name="city" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <ErrorsField />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="flex-end">
          <Grid item xs={4}>
            {state.disabled ? (
              canEdit && (
                <Button
                  startIcon={<EditIcon />}
                  color="primary"
                  onClick={() => setState({ ...state, disabled: false })}
                >
                  Edit
                </Button>
              )
            ) : (
              <>
                <Button
                  type="reset"
                  startIcon={<CancelIcon />}
                  className={classes.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <SubmitField
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={state.isSubmitting}
                >
                  save
                </SubmitField>
              </>
            )}
          </Grid>
          {model && canDelete && (
            <Grid item xs={8}>
              <ElementRemoveConfirmationDialog
                type="employee"
                onRemoveSuccess={() => history.push('/users')}
                methodPayload={{ employeeId: model._id }}
              />
            </Grid>
          )}
        </Grid>
      </AutoForm>
    </>
  );
};

export default ManageEmployeesForm;
