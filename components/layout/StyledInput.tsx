import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import ErrorTypography from '../ErrorTypography';

const StyledInputBase = styled(InputBase)(({ theme }) => {
  return {
    '&': {
      borderRadius: 4,
      border: '2px solid transparent',
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.grey[100] : '#49414E',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
      ]),
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
    },
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      fontSize: 16,
      padding: '10px 12px',
    },
  };
});

interface SxProps {
  width?: any;
}

const StyledInput: FC<{
  label?: string;
  input: InputBaseProps;
  helperText?: string | false | undefined;
}> = ({ label, input, helperText }) => {
  const sx = input.sx ? (input.sx as SxProps) : null;

  return (
    <FormControl
      fullWidth={input?.fullWidth}
      variant="standard"
      sx={{ display: 'block' }}
    >
      {label && (
        <InputLabel
          shrink
          htmlFor={input.id}
          sx={{ transform: 'translate(0, -3.5px)' }}
        >
          {label}
        </InputLabel>
      )}
      <StyledInputBase {...input} />
      <Box sx={{ mb: 2, width: sx ? sx.width || 'auto' : 'auto' }}>
        <ErrorTypography>{helperText}</ErrorTypography>
      </Box>
    </FormControl>
  );
};

export default StyledInput;
