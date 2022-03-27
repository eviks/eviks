import axios from 'axios';
import { Post } from '../types';

export const fetchPost = async (postId: string) => {
  try {
    const response = await axios.get<Post>(
      `${process.env.BASE_URL}/api/posts/${postId}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
