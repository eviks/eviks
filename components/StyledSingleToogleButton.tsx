import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledToggleButton = styled(ToggleButton)(({ theme }) => {
  return {
    '&.Mui-selected, &.Mui-selected:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create(['background-color']),
    },
  };
});

interface StyledSingleToogleButtonProps {
  name: string;
  value: boolean;
  title: string;
  icon: React.ReactNode;
  onChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any,
  ) => void;
}

const StyledSingleToogleButton = ({
  name,
  value,
  title,
  icon,
  onChange,
}: StyledSingleToogleButtonProps) => {
  return (
    <StyledToggleButton
      value={name}
      selected={value}
      onChange={onChange}
      sx={{
        borderRadius: 10,
        px: { xs: 1, md: 5 },
        textTransform: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>{icon}</Box>
      {title}
    </StyledToggleButton>
  );
};

export default StyledSingleToogleButton;
