import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

interface QueryParams {
  id: string;
}

type StringQueryParams = Record<keyof QueryParams, string>;

const PostDetailed: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as StringQueryParams;

  return <div>{id}</div>;
};

export default PostDetailed;
