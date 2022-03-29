import React, { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { AppContext } from '../store/appContext';
import EditPostGeneralInfo from '../components/editPost/EditPostGeneralInfo';
import { initPost } from '../actions/post';

const CreatePost: NextPage = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    initPost()(dispatch);
  }, [dispatch]);

  const renderStep = () => {
    switch (0) {
      case 0:
        return <EditPostGeneralInfo />;
      default:
        return <EditPostGeneralInfo />;
    }
  };

  return (
    <Container sx={{ pt: 10 }}>
      <Paper
        sx={{
          p: 5,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {renderStep()}
      </Paper>
    </Container>
  );
};

export default CreatePost;
