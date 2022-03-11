import React, { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import axios from 'axios';
import PostItem from '../components/PostItem';
import { Post } from '../types';

interface QueryParams {
  slug: string[];
}

type StringQueryParams = Record<keyof QueryParams, string>;

const Home: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query as StringQueryParams;

  const { 0: city, 1: dealType } = slug;

  const [posts, setPosts] = useState<Post[]>();

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/posts/?page=1&limit=20`);
      setPosts(response.data.result);
    } catch (error) {
      //
    }
  }, []);

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
