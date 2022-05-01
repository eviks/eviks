import React, { FC } from 'react';
import Typography from '@mui/material/Typography';

const StepTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
  );
};

export default StepTitle;
