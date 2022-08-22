import React, { FC, Fragment } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import ErrorTypography from '../ErrorTypography';

interface Values {
  value: any;
  icon: JSX.Element;
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

interface StyledToggleButtonRoundedProps {
  value: any;
  title?: string;
  values: Values[];
  toggleProps: ToggleButtonGroupProps;
  helperText?: string | false | undefined;
}

const StyledToggleButtonRounded: FC<StyledToggleButtonRoundedProps> = ({
  value,
  title,
  values,
  toggleProps,
  helperText,
}) => {
  const theme = useTheme();

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
      <StyledToggleButtonGroup color="primary" value={value} {...toggleProps}>
        {(values as Values[]).map((element, index) => {
          return (
            <ToggleButton
              key={index}
              value={element.value}
              sx={{
                width: { xs: '110px', md: '120px' },
                height: { xs: '110px', md: '120px' },
                textTransform: 'none',
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
      <Box sx={{ mb: 2 }}>
        {<ErrorTypography>{helperText}</ErrorTypography>}
      </Box>
    </Fragment>
  );
};

export default StyledToggleButtonRounded;
