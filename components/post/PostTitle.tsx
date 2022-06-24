import React, { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MetroIcon from '../icons/MetroIcon';
import { getSettlementPresentation, getMetroPresentation } from '../../utils';
import { Post, EstateType } from '../../types';

const PostTitle: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const capitalize = (value: String) => {
    return value[0].toUpperCase() + value.slice(1);
  };

  const getPostTitle = () => {
    let settlement = '';

    if (post.subdistrict) {
      settlement = getSettlementPresentation(post.subdistrict, router.locale);
    } else if (post.district) {
      settlement = getSettlementPresentation(post.district, router.locale);
    }

    return t(
      `post:fullPostTitle.${post.estateType}${capitalize(post.dealType)}${
        post.estateType === EstateType.apartment
          ? capitalize(post.apartmentType ?? '')
          : ''
      }`,
      {
        rooms: post.rooms,
        sqm: post.sqm,
        floor: post.floor,
        totalFloors: post.totalFloors,
        lotSqm: post.lotSqm,
        settlement,
      },
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h1" fontSize={28} fontWeight={500}>
        {getPostTitle()}
      </Typography>

      <Typography
        variant="subtitle1"
        fontSize={16}
        color={(theme) => {
          return theme.palette.text.secondary;
        }}
      >
        {`${getSettlementPresentation(post.city, router.locale)}, ${
          post.address
        }`}
      </Typography>

      {post.metroStation && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MetroIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontSize={16}>
            {getMetroPresentation(post.metroStation, router.locale)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PostTitle;
