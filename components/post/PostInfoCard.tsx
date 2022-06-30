import React, { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import FavoriteButton from '../postButtons/FavoriteButton';
import { fetchPostPhoneNumber } from '../../actions/posts';
import { formatter, getSettlementPresentation } from '../../utils';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { Post, EstateType } from '../../types';

const PostInfoCard: FC<{
  post: Post;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}> = ({ post, phoneNumber, setPhoneNumber }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const getTitle = () => {
    switch (post.estateType) {
      case EstateType.apartment:
        return t('post:apartmentRooms', { rooms: post.rooms });
      case EstateType.house:
        return t('post:houseRooms', { rooms: post.rooms });

      default:
        return '';
    }
  };

  const getPhoneNumber = async () => {
    try {
      const result = await fetchPostPhoneNumber(post._id.toString());
      setPhoneNumber(result.phoneNumber);
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Failure) {
        errorMessage = error.message;
      } else if (error instanceof ServerError) {
        errorMessage = t('common:serverError');
      } else {
        errorMessage = t('common:unknownError');
      }
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Card
      variant="elevation"
      elevation={0}
      sx={{ mx: 2, position: 'sticky', top: 85 }}
    >
      <CardContent>
        <Box sx={{ pb: 2 }}>
          <FavoriteButton postId={post._id} />
        </Box>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h5">{`${post.sqm} ${t(
            'post:m2',
          )}, ${getTitle()}`}</Typography>
          <Typography variant="h4" fontWeight={700}>
            {formatter.format(post.price)}
          </Typography>
          <Typography variant="h5">
            {post.subdistrict
              ? getSettlementPresentation(post.subdistrict, router.locale)
              : getSettlementPresentation(post.district, router.locale)}
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={16}
            color={(theme) => {
              return theme.palette.text.secondary;
            }}
          >
            {t('post:priceForM2', {
              price: formatter.format(post.price / post.sqm),
            })}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ pt: 2 }}>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(`post:${post.userType}`)}
          </Typography>
          <Typography variant="subtitle1">{post.username}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        {!phoneNumber ? (
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1.2 }}
            onClick={getPhoneNumber}
          >
            {t('post:showPhoneNumber')}
          </Button>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={32}>{phoneNumber}</Typography>
            <Typography
              variant="caption"
              color={(theme) => {
                return theme.palette.text.secondary;
              }}
            >
              {t('post:callHint')}
            </Typography>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default PostInfoCard;
