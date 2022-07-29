import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import ErrorTypography from '../ErrorTypography';

const StyledInputBase: FC = styled(InputBase)(({ theme }) => {
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

class StyledInput extends ValidatorComponent {
  state = {
    isValid: true,
  };

  renderValidatorComponent() {
    const { name, value, label, input } = this.props;

    return (
      <FormControl fullWidth={input?.fullWidth} variant="standard">
        {label && (
          <InputLabel
            shrink
            htmlFor={input.id}
            sx={{ transform: 'translate(0, -3.5px)' }}
          >
            {label}
          </InputLabel>
        )}
        <StyledInputBase name={name} value={value} {...input} />
        <Box sx={{ mb: 2, width: input.sx?.width || 'auto' }}>
          {this.errorText()}
        </Box>
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
