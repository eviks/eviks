import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { youtubeIdFromLink } from '../utils';

const YoutubeEmbed: FC<{ link: string }> = ({ link }) => {
  return (
    <Box>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${youtubeIdFromLink(link)}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        style={{
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      />
    </Box>
  );
};

export default YoutubeEmbed;
