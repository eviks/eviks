import React, { useEffect, useCallback, useContext } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostItem from '../components/PostItem';
import { AppContext } from '../store/appContext';
import { Types } from '../store/reducers';
import { setURLParams } from '../utils/urlParams';

interface QueryParams {
  slug: string[];
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Home: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { posts } = state.posts;

  const router = useRouter();
  const { slug } = router.query as StringQueryParams;

  const { 0: city, 1: dealType } = slug;

  const fetchPosts = useCallback(async () => {
    try {
      const localityResponse = await axios.get(
        `/api/localities?routeName=${city}`,
      );

      // City ID & deal type are required
      const searchParams = {
        cityId:
          localityResponse.data.length > 0
            ? (localityResponse.data[0].id as string)
            : '10',
        dealType,
      };

      const url = setURLParams(searchParams);

      const response = await axios.get(
        `/api/posts/?${url && `${url}&`}limit=${15}&page=1`,
      );
      dispatch({ type: Types.GetPosts, payload: response.data.result });
    } catch (error) {
      //
    }
  }, [city, dealType, dispatch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container sx={{ pt: 10 }}>
      {`City: ${city} Deal type: ${dealType}`}
      {posts &&
        posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
    </Container>
  );
};

export default Home;
