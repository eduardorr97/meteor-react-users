import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';

type Props = {
  open: boolean;
  loading: boolean;
  onClose(): void;
  onConfirm(): void;
  title: string;
  description?: string;
};

const ConfirmationDialog = ({
  open,
  loading,
  onClose,
  onConfirm,
  title = 'Delete this element?',
  description,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              color="primary"
              variant="contained"
              autoFocus
            >
              Confirm
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
