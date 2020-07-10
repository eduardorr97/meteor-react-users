import React, { useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

type Props = {
  type: 'company' | 'employee';
  methodPayload: { companyId: string } | { employeeId: string };
  onRemoveSuccess(): void;
};

type StateProps = {
  dialogOpen: boolean;
  loading?: boolean;
};

const contexts = {
  company: {
    methodName: 'companies.remove',
    title: 'Delete this Company',
    description:
      'By confirming this action, the connection to this company will be removed. The company will remain working with its currently assigned offers and certificates',
  },
  employee: {
    methodName: 'employees.remove',
    title: 'Delete this Employee',
    description:
      'By confirming this action, this employee will be removed entirely from the database. Assigned certificates will be passed to the current company distributor',
  },
};

const ElementRemoveConfirmationDialog = ({
  type,
  methodPayload,
  onRemoveSuccess,
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<StateProps>({
    dialogOpen: false,
    loading: false,
  });

  const dialogContext = contexts[type];
  const deleteElement = () => {
    setState({ ...state, loading: true });

    Meteor.call(
      'authorizedMethodCall',
      dialogContext.methodName,
      methodPayload,
      (err: Meteor.Error) => {
        setState({ ...state, loading: false });
        if (err) {
          enqueueSnackbar(err.message, { variant: 'error' });
        } else {
          onRemoveSuccess();
          enqueueSnackbar(`${type} removed correctly`, {
            variant: 'success',
          });
        }
      }
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ConfirmationDialog
        loading={state.loading}
        open={state.dialogOpen}
        onClose={() => setState({ ...state, dialogOpen: false })}
        onConfirm={deleteElement}
        title={dialogContext.title}
        description={dialogContext.description}
      />
      <Button
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => setState({ dialogOpen: true })}
      >
        delete {type}
      </Button>
    </div>
  );
};

export default ElementRemoveConfirmationDialog;
