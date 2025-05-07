import React from 'react';
import { Paper, Typography, Box, Alert, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BaseAuthFormProps {
  title: string;
  error?: string | null;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkTo: string;
  children: React.ReactNode;
}

const BaseAuthForm: React.FC<BaseAuthFormProps> = ({
  title,
  error,
  onSubmit,
  submitButtonText,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
  children,
}) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 3, px: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        {title}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
        <Button type="submit" variant="contained" color="primary">
          {submitButtonText}
        </Button>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="body1">
          {bottomText}{' '}
          <Link component={RouterLink} to={bottomLinkTo}>
            {bottomLinkText}
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default BaseAuthForm;
