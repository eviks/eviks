import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../../store/appContext';
import { getSettlementPresentation, formatter } from '../../utils';

const PostsTable: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();

  const {
    state: {
      posts: { posts },
    },
  } = useContext(AppContext);

  const locale =
    router.defaultLocale !== router.locale ? `/${router.locale}` : '';

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t('postReview:id')}</TableCell>
            <TableCell>{t('postReview:date')}</TableCell>
            <TableCell>{t('postReview:city')}</TableCell>
            <TableCell>{t('postReview:district')}</TableCell>
            <TableCell>{t('postReview:subdistrict')}</TableCell>
            <TableCell>{t('postReview:dealType')}</TableCell>
            <TableCell>{t('postReview:estateType')}</TableCell>
            <TableCell>{t('postReview:userType')}</TableCell>
            <TableCell>{t('postReview:price')}</TableCell>
            <TableCell>{t('postReview:status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => {
            return (
              <TableRow
                key={post._id}
                target="_blank"
                component={Link}
                underline="none"
                href={`${locale}/posts/unreviewed/${post._id}`}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor:
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {post._id}
                </TableCell>
                <TableCell>
                  {moment(post.createdAt).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell>
                  {getSettlementPresentation(post.city, router.locale)}
                </TableCell>
                <TableCell>
                  {getSettlementPresentation(post.district, router.locale)}
                </TableCell>
                <TableCell>
                  {post.subdistrict
                    ? getSettlementPresentation(post.subdistrict, router.locale)
                    : '-'}
                </TableCell>
                <TableCell>{t(`postReview:${post.dealType}Type`)}</TableCell>
                <TableCell>{t(`postReview:${post.estateType}`)}</TableCell>
                <TableCell>{t(`postReview:${post.userType}`)}</TableCell>
                <TableCell>{formatter.format(post.price)}</TableCell>
                <TableCell>{'---'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PostsTable;
