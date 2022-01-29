import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import useTranslation from 'next-translate/useTranslation';

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Button variant="contained">{t('common:greeting')}</Button>
    </Container>
  );
};

export default Home;
