import React, { useEffect, useContext } from 'react';
import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { AppContext } from '../store/appContext';
import EditPostStepper from '../components/editPost/EditPostStepper';
import EditPostGeneralInfo from '../components/editPost/EditPostGeneralInfo';
import EditPostMap from '../components/editPost/EditPostMap';
import { initPost } from '../actions/post';
import useWindowSize from '../utils/hooks/useWindowSize';

const CreatePost: NextPage = () => {
  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    initPost()(dispatch);
  }, [dispatch]);

  const { width } = useWindowSize();

  const renderStep = () => {
    switch (post.step) {
      case 0:
        return <EditPostGeneralInfo />;
      case 1:
        return <EditPostMap />;
      default:
        return <EditPostGeneralInfo />;
    }
  };

  return (
    <Container sx={{ pt: 10 }}>
      <Paper elevation={width && width > 900 ? 1 : 0} sx={{ p: { xs: 0 } }}>
        <EditPostStepper step={post.step ?? 0} />
        {renderStep()}
      </Paper>
    </Container>
  );
};

export default CreatePost;
