import React from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

const Verification = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
      }}
    >
      <Image
        src={'/illustrations/verification.svg'}
        alt="verification"
        width={500}
        height={500}
      />
    </Grid>
  );
};

export default Verification;
