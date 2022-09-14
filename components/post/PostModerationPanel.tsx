import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PostModerationPanel = () => {
  const { t } = useTranslation();

  const confirmPost = () => {};

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: 24,
          fontWeight: 400,
          textAlign: 'center',
          mb: 2,
        }}
      >
        {t('postModeration:moderation')}
      </Typography>
      <Button
        color="success"
        variant="contained"
        fullWidth
        disableElevation
        onClick={confirmPost}
        sx={{ py: 1.2 }}
      >
        {t('postModeration:confirm')}
      </Button>
    </Paper>
  );
};

export default PostModerationPanel;
