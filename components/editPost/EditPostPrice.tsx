import React, { FC, useContext, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StepTitle from './StepTitle';
import StyledInput from '../layout/StyledInput';
import MoneyIcon from '../icons/MoneyIcon';
import { AppContext } from '../../store/appContext';
import { setPostData } from '../../actions/post';
import { Post, DealType } from '../../types';

interface PriceState {
  price: string;
  haggle: boolean;
  installmentOfPayment: boolean;
  prepayment: boolean;
  municipalServicesIncluded: boolean;
}

const getDefaultState = (post: Post): PriceState => {
  const defaultPrice =
    Number(post.price) > 0 ? post.price?.toString() ?? '' : '';

  return {
    price: (post.lastStep || -1) >= 7 ? defaultPrice : '',
    haggle: (post.lastStep || -1) >= 7 ? post.haggle ?? false : false,
    installmentOfPayment:
      (post.lastStep || -1) >= 7 ? post.installmentOfPayment ?? false : false,
    prepayment: (post.lastStep || -1) >= 7 ? post.prepayment ?? false : false,
    municipalServicesIncluded:
      (post.lastStep || -1) >= 7
        ? post.municipalServicesIncluded ?? false
        : false,
  };
};

const EditPostPrice: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const validationSchema = yup.object({
    price: yup
      .number()
      .required(t('common:errorRequiredField'))
      .min(1, t('common:errorRequiredField')),
    haggle: yup.boolean(),
    installmentOfPayment: yup.boolean(),
    prepayment: yup.boolean(),
    municipalServicesIncluded: yup.boolean(),
  });

  const formik = useFormik<PriceState>({
    initialValues: getDefaultState(post),
    validationSchema,
    onSubmit: async () => {
      // eslint-disable-next-line no-use-before-define
      setPostDataAndDispatch(8);
    },
  });

  const isSale = post.dealType === DealType.sale;

  const {
    price,
    haggle,
    installmentOfPayment,
    prepayment,
    municipalServicesIncluded,
  } = formik.values;

  const getPriceLabel = () => {
    switch (post.dealType) {
      case DealType.sale:
        return t('post:price');
      case DealType.rentPerDay:
        return t('post:pricePerDay');
      case DealType.rent:
        return t('post:pricePerMonth');
      default:
        return t('post:price');
    }
  };

  const setPostDataAndDispatch = (step: number) => {
    setPostData({
      ...post,
      price: Number(price),
      haggle,
      installmentOfPayment,
      prepayment,
      municipalServicesIncluded,
      step,
      lastStep: Math.max(7, post.lastStep ?? 7),
    })(dispatch);
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(6);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container
        disableGutters
        sx={{
          py: { md: 5 },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <StepTitle title={t('post:priceTitle')} />
        {/* Price */}
        <StyledInput
          label={getPriceLabel()}
          input={{
            id: 'price',
            name: 'price',
            value: price,
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: formik.handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
          helperText={formik.touched.price && formik.errors.price}
        />
        {/* Haggle */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name={'haggle'}
                checked={haggle}
                onChange={formik.handleChange}
              />
            }
            label={t('post:haggle')}
          />
        </FormGroup>
        {isSale ? (
          //  Installment of payment
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name={'installmentOfPayment'}
                  checked={installmentOfPayment}
                  onChange={formik.handleChange}
                />
              }
              label={t('post:installmentOfPayment')}
            />
          </FormGroup>
        ) : (
          <Fragment>
            {/* Prepayment */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'prepayment'}
                    checked={prepayment}
                    onChange={formik.handleChange}
                  />
                }
                label={t('post:prepayment')}
              />
            </FormGroup>
            {/* Municipal services included */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'municipalServicesIncluded'}
                    checked={municipalServicesIncluded}
                    onChange={formik.handleChange}
                  />
                }
                label={t('post:municipalServicesIncluded')}
              />
            </FormGroup>
          </Fragment>
        )}
        <Container
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type={'button'}
            variant="contained"
            color="secondary"
            disableElevation
            sx={{ mt: 1, py: 1 }}
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            sx={{ mt: 1, py: 1 }}
          >
            {t('post:next')}
          </Button>
        </Container>
      </Container>
    </form>
  );
};

export default EditPostPrice;
