import React, { FC, Fragment } from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { ReviewStatus, ReviewHistory } from '../../types';

const PostReviewStatus: FC<{
  reviewStatus: ReviewStatus;
  reviewHistory: ReviewHistory[];
}> = ({ reviewStatus, reviewHistory }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: 2,
        p: 2,
        border: `1px solid ${theme.palette.divider.toString()}`,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Image
        src={`/illustrations/${reviewStatus}.svg`}
        alt="moderation"
        width={150}
        height={150}
      />
      <Box
        sx={{
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Typography
          variant="h5"
          color={
            reviewStatus === 'rejected' ? theme.palette.error.main : 'auto'
          }
        >
          {t(`postModeration:${reviewStatus}Title`)}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          {t(`postModeration:${reviewStatus}Hint`)}
        </Typography>
        {reviewStatus === 'rejected' && reviewHistory.length > 0 && (
          <Fragment>
            <Typography sx={{ fontWeight: [700] }}>
              {reviewHistory[0].comment}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {t(`postModeration:${reviewStatus}HintEnding`)}
            </Typography>
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default PostReviewStatus;
