import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const ServerError: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Container
      sx={{
        mt: 12,
        mb: 10,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Image
          src={'/illustrations/500.svg'}
          alt="server_error"
          width={500}
          height={500}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h1" textAlign={'center'}>
            {t('serverError:serverErrorTitle')}
          </Typography>
          <Divider orientation="vertical" sx={{ height: '60px' }} />
          <Typography
            variant="subtitle1"
            textAlign={'center'}
            fontSize={28}
            lineHeight={1.2}
          >
            {t('serverError:serverErrorHint')}
          </Typography>
        </Box>
        <Link href="/" passHref>
          <Button variant={'contained'} disableElevation sx={{ mt: 2 }}>
            {t('serverError:goHome')}
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default ServerError;
