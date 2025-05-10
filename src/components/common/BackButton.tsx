import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
  url?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Назад', url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url)
      navigate(url);
    else
      navigate(-1);
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleClick}>
      {label}
    </Button>
  );
};

export default BackButton;
