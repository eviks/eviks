import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import FavoriteButton from '../postButtons/FavoriteButton';
import EditPostButton from '../postButtons/EditPostButton';
import DeletePostButton from '../postButtons/DeletePostButton';
import { fetchPostPhoneNumber } from '../../actions/posts';
import { AppContext } from '../../store/appContext';
import { formatter, getSettlementPresentation } from '../../utils';
import Failure from '../../utils/errors/failure';
import ServerError from '../../utils/errors/serverError';
import { Post, EstateType } from '../../types';

const PostInfoCard: FC<{
  post: Post;
  phoneNumber: string;
  displayButtons: boolean;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}> = ({ post, phoneNumber, displayButtons, setPhoneNumber }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const {
    state: {
      auth: { user, isInit },
    },
  } = useContext(AppContext);

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
      elevation={theme.palette.mode === 'light' ? 0 : 1}
      sx={{ borderRadius: '12px', p: 2 }}
    >
      <CardContent>
        {displayButtons && (
          <Box sx={{ pb: 2 }}>
            {isInit &&
              (user?._id === post.user ? (
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                  <EditPostButton
                    postId={post._id}
                    reviewStatus={post.reviewStatus}
                  />
                  <DeletePostButton
                    postId={post._id}
                    reviewStatus={post.reviewStatus}
                  />
                </Box>
              ) : (
                <FavoriteButton postId={post._id} />
              ))}
          </Box>
        )}

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
            disableElevation
            onClick={getPhoneNumber}
            sx={{ py: 1.2 }}
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
