import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const NotFound: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Head>
        <title>{t(`common:projectTitle`)}</title>
      </Head>
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
          }}
        >
          <Image
            src={'/illustrations/404.svg'}
            alt="not_found"
            width={400}
            height={400}
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
              {t('notFound:notFoundTitle')}
            </Typography>
            <Divider orientation="vertical" sx={{ height: '60px' }} />
            <Typography
              variant="subtitle1"
              textAlign={'center'}
              fontSize={28}
              lineHeight={1.2}
            >
              {t('notFound:notFoundHint')}
            </Typography>
          </Box>
          <Link href="/" passHref>
            <Button variant={'contained'} disableElevation sx={{ mt: 2 }}>
              {t('notFound:goHome')}
            </Button>
          </Link>
        </Box>
      </Container>
    </Fragment>
  );
};

export default NotFound;
