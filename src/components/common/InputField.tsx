import { TextField, TextFieldProps } from '@mui/material';

const InputField = (props: TextFieldProps) => {
  return <TextField variant="outlined" fullWidth size="small" {...props} />;
};

export default InputField;
