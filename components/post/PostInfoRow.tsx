import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const PostInfoRow: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <Grid container direction={'row'} sx={{ mb: 1 }}>
      <Grid item xs={6} md={3}>
        <Typography
          color={(theme) => {
            return theme.palette.text.secondary;
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6} md={9}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default PostInfoRow;
