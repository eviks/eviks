import React, { FC, Fragment } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ErrorTypography from '../ErrorTypography';

interface Values {
  value: string;
  description: string;
}

interface StyledToggleButtonProps {
  value: any;
  title: string;
  values: Values[];
  toggleProps: ToggleButtonGroupProps;
  helperText?: string | false | undefined;
}

const StyledToggleButton: FC<StyledToggleButtonProps> = ({
  value,
  title,
  values,
  toggleProps,
  helperText,
}) => {
  const theme = useTheme();

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
        {...toggleProps}
      >
        {values.map((element, index) => {
          return (
            <ToggleButton
              key={index}
              value={element.value}
              sx={{
                textTransform: 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ mt: 0.5, textTransform: 'inherit' }}>
                  {element.description}
                </Typography>
              </Box>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
      <Box sx={{ mb: 2 }}>
        {<ErrorTypography>{helperText}</ErrorTypography>}
      </Box>
    </Fragment>
  );
};

export default StyledToggleButton;
