import React, { Fragment, Component } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import ErrorTypography from '../ErrorTypography';

interface Values {
  value: string;
  icon: Component;
  description: string;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => {
  const borderColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[400]
      : theme.palette.grey[800];

  return {
    '& .MuiToggleButtonGroup-grouped': {
      width: '5rem',
      height: '5rem',
      border: 0,
      '&:not(:first-of-type)': {
        marginLeft: `${theme.spacing(2).toString()} !important`,
        border: `1px solid ${borderColor.toString()}`,
        borderRadius: '50%',
      },
      '&:first-of-type': {
        border: `1px solid ${borderColor.toString()}`,
        borderRadius: '50%',
      },
    },
    '.Mui-selected': {
      border: '0 !important',
      color: `${theme.palette.primary.contrastText.toString()} !important`,
      backgroundColor: `${theme.palette.primary.main.toString()} !important`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main.toString()} !important`,
      },
    },
  };
});

const styles = () => {
  return {};
};

class StyledToggleButtonRounded extends ValidatorComponent {
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
        {title && (
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
        )}
        <StyledToggleButtonGroup
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
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      position: 'absolute',
                      top: '80px',
                      height: '45px',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color={(theme) => {
                        return theme.palette.mode === 'light'
                          ? 'rgba(0, 0, 0, 0.6)'
                          : 'rgba(255, 255, 255, 0.7)';
                      }}
                    >
                      {element.description}
                    </Typography>
                  </Box>
                </Box>
              </ToggleButton>
            );
          })}
        </StyledToggleButtonGroup>
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

export default withStyles(styles, { withTheme: true })(
  StyledToggleButtonRounded,
);
