import React, { FC, useState, useContext, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import StepTitle from './StepTitle';
import StyledInput from '../layout/StyledInput';
import MoneyIcon from '../icons/MoneyIcon';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
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
    price: (post.lastStep || -1) >= 6 ? defaultPrice : '',
    haggle: (post.lastStep || -1) >= 6 ? post.haggle ?? false : false,
    installmentOfPayment:
      (post.lastStep || -1) >= 6 ? post.installmentOfPayment ?? false : false,
    prepayment: (post.lastStep || -1) >= 6 ? post.prepayment ?? false : false,
    municipalServicesIncluded:
      (post.lastStep || -1) >= 6
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

  const [priceState, setPriceState] = useState<PriceState>(
    getDefaultState(post),
  );

  const isSale = post.dealType === DealType.sale;

  const {
    price,
    haggle,
    installmentOfPayment,
    prepayment,
    municipalServicesIncluded,
  } = priceState;

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

  const updatePostAndDispatch = (step: number) => {
    updatePost({
      ...post,
      price: Number(price),
      haggle,
      installmentOfPayment,
      prepayment,
      municipalServicesIncluded,
      step,
      lastStep: Math.max(6, post.lastStep ?? 6),
    })(dispatch);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const isBoolean = name !== 'price';

    setPriceState((prevState) => {
      return { ...prevState, [name]: isBoolean ? checked : value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updatePostAndDispatch(7);
  };

  const handlePrevStepClick = () => {
    updatePostAndDispatch(5);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
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
          validators={['required']}
          value={price}
          name="price"
          errorMessages={[t('common:errorRequiredField')]}
          label={getPriceLabel()}
          input={{
            id: 'price',
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon sx={{ mx: 2 }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Haggle */}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name={'haggle'}
                checked={haggle}
                onChange={handleChange}
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
                <Switch
                  name={'installmentOfPayment'}
                  checked={installmentOfPayment}
                  onChange={handleChange}
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
                  <Switch
                    name={'prepayment'}
                    checked={prepayment}
                    onChange={handleChange}
                  />
                }
                label={t('post:prepayment')}
              />
            </FormGroup>
            {/* Municipal services included */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name={'municipalServicesIncluded'}
                    checked={municipalServicesIncluded}
                    onChange={handleChange}
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
            sx={{ mt: 1, py: 1 }}
            onClick={handlePrevStepClick}
          >
            {t('post:back')}
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 1, py: 1 }}>
            {t('post:next')}
          </Button>
        </Container>
      </Container>
    </ValidatorForm>
  );
};

export default EditPostPrice;
