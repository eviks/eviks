import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ReviewStatus } from '../../types';

const PostReviewStatus: FC<{
  reviewStatus: ReviewStatus;
}> = ({ reviewStatus }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      color={reviewStatus === 'rejected' ? theme.palette.error.main : 'auto'}
      sx={{ mb: 2, fontSize: 24 }}
    >
      {t(`moderationStatus:${reviewStatus}Title`)}
    </Typography>
  );
};

export default PostReviewStatus;
