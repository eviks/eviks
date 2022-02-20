import React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const Input = styled(InputBase)(({ theme }) => {
  return {
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.grey[100] : '#49414E',
      border: 'none',
      fontSize: 16,
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        boxShadow: `${theme.palette.primary.main} 0 0 0 0.1rem`,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.background.default,
      },
    },
  };
});

const ErrorTypography = styled('div')(({ theme }) => {
  return {
    color: theme.palette.error.main,
  };
});

class StyledInput extends ValidatorComponent {
  state = {
    isValid: false,
  };

  renderValidatorComponent() {
    const { label, input } = this.props;

    return (
      <FormControl fullWidth={input?.fullWidth} variant="standard">
        {label && (
          <InputLabel shrink htmlFor={input.id}>
            {label}
          </InputLabel>
        )}
        <Input {...input} />
        <div>{this.errorText()}</div>
        <Box sx={{ mb: 2 }}></Box>
      </FormControl>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return <ErrorTypography>{this.getErrorMessage()}</ErrorTypography>;
  }
}

export default StyledInput;
