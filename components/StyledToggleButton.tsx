import React, { Fragment, Component } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import ErrorTypography from './ErrorTypography';

interface Values {
  value: string;
  icon: Component;
  description: string;
}

const styles = () => {
  return {};
};

class StyledToggleButton extends ValidatorComponent {
  state = {
    isValid: true,
  };

  renderValidatorComponent() {
    const {
      value,
      title,
      onChange,
      values,
      theme,
      width,
      height,
      padding,
      toggleProps,
    } = this.props;

    return (
      <Fragment>
        <Typography
          sx={{
            color:
              theme.palette.mode === 'light'
                ? 'rgba(0, 0, 0, 0.6)'
                : 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {title}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={value}
          exclusive
          onChange={onChange}
          {...toggleProps}
        >
          {(values as Values[]).map((element, index) => {
            return (
              <ToggleButton
                key={index}
                value={element.value}
                sx={{
                  width: width || 'auto',
                  height: height || 'auto',
                  textTransform: 'none',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: padding || 'auto',
                  }}
                >
                  {element.icon}
                  <Typography sx={{ mt: 0.5, textTransform: 'inherit' }}>
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

export default withStyles(styles, { withTheme: true })(StyledToggleButton);
