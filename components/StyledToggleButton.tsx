import React, { Fragment, Component } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import ErrorTypography from './ErrorTypography';

interface Values {
  value: string;
  icon: Component;
  description: string;
}

class StyledToggleButton extends ValidatorComponent {
  state = {
    isValid: true,
  };

  renderValidatorComponent() {
    const { value, title, onChange, values } = this.props;

    return (
      <Fragment>
        <Typography>{title}</Typography>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={onChange}
        >
          {(values as Values[]).map((element, index) => {
            return (
              <ToggleButton
                key={index}
                value={element.value}
                sx={{
                  width: { xs: '110px', md: '120px' },
                  height: { xs: '110px', md: '120px' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                  }}
                >
                  {element.icon}
                  <Typography sx={{ mt: 0.5, textTransform: 'capitalize' }}>
                    {element.description}
                  </Typography>
                </Box>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <Box sx={{ mb: 2 }}>{this.errorText()}</Box>
      </Fragment>
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

export default StyledToggleButton;
