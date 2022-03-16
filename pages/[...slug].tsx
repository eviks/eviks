import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostItem from '../components/PostItem';
import { User, Post } from '../types';
import { setURLParams } from '../utils/urlParams';

interface QueryParams {
  slug: string[];
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Home: NextPage<{ user?: User }> = ({ user }) => {
  const router = useRouter();
  const { slug } = router.query as StringQueryParams;

  const { 0: city, 1: dealType } = slug;

  const [posts, setPosts] = useState<Post[]>();
  const [favoritePosts, setFavoritePosts] = useState<{
    [key: string]: boolean;
  }>(user?.favorites ? user.favorites : {});

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
      setPosts(response.data.result);
    } catch (error) {
      //
    }
  }, [city, dealType]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container sx={{ pt: 10 }}>
      {`City: ${city} Deal type: ${dealType}`}
      {posts &&
        posts.map((post) => {
          return (
            <PostItem
              key={post._id}
              post={post}
              isFavorite={favoritePosts[post._id]}
            />
          );
        })}
    </Container>
  );
};

export default Home;
