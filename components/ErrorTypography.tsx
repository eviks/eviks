import { styled } from '@mui/material/styles';

const ErrorTypography = styled('div')(({ theme }) => {
  return {
    color: theme.palette.error.main,
  };
});

export default ErrorTypography;
