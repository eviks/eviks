import React, { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import PencilIcon from '../icons/PencilIcon';
import { ReviewStatus } from '../../types';

const EditPostButton: FC<{
  postId: number;
  reviewStatus?: ReviewStatus;
  unreviewed: boolean;
}> = ({ postId, reviewStatus, unreviewed }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const theme = useTheme();

  const handleClick = async () => {
    router.push({
      pathname: '/edit_post',
      query: { id: postId, unreviewed },
    });
  };

  return (
    <Tooltip title={t('common:editPostButton')}>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-label="edit-post"
        size="large"
        disabled={reviewStatus === 'onreview'}
        sx={{
          minWidth: 'auto',
          p: 1.4,
          borderRadius: 2,
          zIndex: '200',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.action.active,
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <PencilIcon />
      </Button>
    </Tooltip>
  );
};

export default EditPostButton;
