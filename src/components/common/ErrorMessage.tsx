import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type ErrorMessageProps = {
  message: string;
  open: boolean;
  onClose: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}  // автоматически скрывается через 4 секунды
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // всплывает сверху по центру
    >
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
