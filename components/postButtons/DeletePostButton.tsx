import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import GarbageIcon from '../icons/GarbageIcon';

const DeletePostButton: FC<{ postId: number }> = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  const handleClick = async () => {};

  return (
    <Tooltip title={t('common:deletePostButton')}>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-label="delete-post"
        size="large"
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
        <GarbageIcon />
      </Button>
    </Tooltip>
  );
};

export default DeletePostButton;
