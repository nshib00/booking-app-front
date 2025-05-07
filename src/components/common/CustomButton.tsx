import { Button, ButtonProps } from '@mui/material';

const CustomButton = (props: ButtonProps) => {
  return <Button variant="contained" color="primary" sx={{ borderRadius: 8, textTransform: 'none' }} {...props} />;
};

export default CustomButton;
