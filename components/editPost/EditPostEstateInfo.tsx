import React, { FC, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StepTitle from './StepTitle';
import StyledInput from '../layout/StyledInput';
import StyledToggleButton from '../layout/StyledToggleButton';
import StyledToggleButtonRoundedSm from '../layout/StyledToggleButtonRoundedSm';
import SqmIcon from '../icons/SqmIcon';
import GardenIcon from '../icons/GardenIcon';
import ElevatorIcon from '../icons/ElevatorIcon';
import { AppContext } from '../../store/appContext';
import { setPostData } from '../../actions/post';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { EstateType, Post, Renovation } from '../../types';

interface EstateInfoState {
  rooms: string | null;
  sqm: string;
  livingRoomsSqm: string;
  kitchenSqm: string;
  lotSqm: string;
  floor: string;
  totalFloors: string;
  renovation?: Renovation | null;
  documented: boolean;
  redevelopment: boolean;
}

const getDefaultState = (post: Post): EstateInfoState => {
  const defaultRooms = post.rooms > 0 ? post.rooms.toString() : '';
  const defaultSqm = post.sqm > 0 ? post.sqm.toString() : '';
  const defaultLivingRoomsSqm =
    Number(post.livingRoomsSqm) > 0
      ? post.livingRoomsSqm?.toString() ?? ''
      : '';
  const defaultKithcenSqm =
    Number(post.kitchenSqm) > 0 ? post.kitchenSqm?.toString() ?? '' : '';
  const defaultLotSqm =
    Number(post.lotSqm) > 0 ? post.lotSqm?.toString() ?? '' : '';
  const defaultFloor =
    Number(post.floor) > 0 ? post.floor?.toString() ?? '' : '';
  const defultTotalFloors =
    Number(post.totalFloors) > 0 ? post.totalFloors?.toString() ?? '' : '';

  return {
    rooms: (post.lastStep || -1) >= 2 ? defaultRooms : '',
    sqm: (post.lastStep || -1) >= 2 ? defaultSqm : '',
    livingRoomsSqm: (post.lastStep || -1) >= 2 ? defaultLivingRoomsSqm : '',
    kitchenSqm: (post.lastStep || -1) >= 2 ? defaultKithcenSqm : '',
    lotSqm: (post.lastStep || -1) >= 2 ? defaultLotSqm : '',
    floor: (post.lastStep || -1) >= 2 ? defaultFloor : '',
    totalFloors: (post.lastStep || -1) >= 2 ? defultTotalFloors : '',
    renovation: (post.lastStep || -1) >= 2 ? post.renovation : undefined,
    documented: (post.lastStep || -1) >= 2 ? post.documented ?? false : false,
    redevelopment:
      (post.lastStep || -1) >= 2 ? post.redevelopment ?? false : false,
  };
};

const EditPostEstateInfo: FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const isHouse = post.estateType === EstateType.house;

  const validationSchema = yup.object({
    rooms: yup.number().nullable().required(t('common:fieldIsRequired')),
    sqm: yup
      .number()
      .required(t('common:errorRequiredField'))
      .min(1, t('common:errorRequiredField')),
    livingRoomsSqm: yup.number(),
    kitchenSqm: yup.number(),
    lotSqm: yup
      .number()
      .test('lotSqmIsValid', t('common:errorRequiredField'), (value) => {
        return !isHouse || Number(value) > 0;
      }),
    floor: yup
      .number()
      .test('floorIsRequired', t('common:errorRequiredField'), (value) => {
        return isHouse || Number(value) > 0;
      })
      .test(
        'floorIsValid',
        t('post:errorFloor'),
        function checkIfFloorIsValid(value) {
          return isHouse || Number(value) <= Number(this.parent.totalFloors);
        },
      ),
    totalFloors: yup.number(),
    renovation: yup.string().nullable().required(t('common:fieldIsRequired')),
    documented: yup.boolean(),
    redevelopment: yup.boolean(),
  });

  const formik = useFormik<EstateInfoState>({
    initialValues: getDefaultState(post),
    validationSchema,
    onSubmit: async () => {
      // eslint-disable-next-line no-use-before-define
      setPostDataAndDispatch(3);
    },
  });

  const {
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    lotSqm,
    floor,
    totalFloors,
    renovation,
    documented,
    redevelopment,
  } = formik.values;

  const handleRoomsChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    formik.setFieldValue('rooms', value);
  };

  const handleRenovationChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: Renovation,
  ) => {
    formik.setFieldValue('renovation', value);
  };

  const setPostDataAndDispatch = (step: number) => {
    setPostData({
      ...post,
      rooms: Number(rooms),
      sqm: Number(sqm),
      livingRoomsSqm: Number(livingRoomsSqm),
      kitchenSqm: Number(kitchenSqm),
      lotSqm: Number(lotSqm),
      floor: Number(floor),
      totalFloors: Number(totalFloors),
      renovation: renovation ?? Renovation.cosmetic,
      documented,
      redevelopment,
      step,
      lastStep: Math.max(2, post.lastStep ?? 2),
    })(dispatch);
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(1);
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
        <StepTitle title={t('post:estateInfo')} />
        {/* Rooms */}
        <StyledToggleButtonRoundedSm
          title={t('post:rooms')}
          value={rooms}
          values={[
            {
              value: '1',
              description: '1',
            },
            {
              value: '2',
              description: '2',
            },
            {
              value: '3',
              description: '3',
            },
            {
              value: '4',
              description: '4',
            },
            {
              value: '5',
              description: '5 +',
            },
          ]}
          toggleProps={{ exclusive: true, onChange: handleRoomsChange }}
          helperText={formik.touched.rooms && formik.errors.rooms}
        />
        <Box
          sx={{
            display: { md: 'flex', xs: 'inherit' },
          }}
        >
          {/* Sqm */}
          <StyledInput
            label={t('post:sqm')}
            input={{
              id: 'sqm',
              name: 'sqm',
              value: sqm,
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: formik.handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <SqmIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
            helperText={formik.touched.sqm && formik.errors.sqm}
          />
          {/* Living rooms sqm */}
          <StyledInput
            label={t('post:livingRoomsSqm')}
            input={{
              id: 'livingRoomsSqm',
              name: 'livingRoomsSqm',
              value: livingRoomsSqm,
              type: 'number',
              sx: {
                ml: { md: 1, xs: 0 },
                width: '180px',
              },
              onChange: formik.handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <SqmIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
          {/* Kitchen sqm */}
          <StyledInput
            label={t('post:kitchenSqm')}
            input={{
              id: 'kitchenSqm',
              name: 'kitchenSqm',
              value: kitchenSqm,
              type: 'number',
              sx: {
                ml: { md: 1, xs: 0 },
                width: '180px',
              },
              onChange: formik.handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <SqmIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* Lot sqm */}
        {isHouse && (
          <StyledInput
            label={t('post:lotSqm')}
            input={{
              id: 'lotSqm',
              name: 'lotSqm',
              value: lotSqm,
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: formik.handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <GardenIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
            helperText={formik.touched.lotSqm && formik.errors.lotSqm}
          />
        )}
        {/* Floor */}
        {!isHouse ? (
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <StyledInput
              label={t('post:floor')}
              input={{
                id: 'floor',
                name: 'floor',
                value: floor,
                type: 'number',
                sx: {
                  width: '180px',
                },
                onChange: formik.handleChange,
                startAdornment: (
                  <InputAdornment position="start">
                    <ElevatorIcon sx={{ ml: 1 }} />
                  </InputAdornment>
                ),
              }}
              helperText={formik.touched.floor && formik.errors.floor}
            />
            <StyledInput
              label={' '}
              input={{
                id: 'totalFloors',
                name: 'totalFloors',
                value: totalFloors,
                type: 'number',
                sx: {
                  ml: 1,
                  width: '180px',
                },
                onChange: formik.handleChange,
              }}
              helperText={
                formik.touched.totalFloors && formik.errors.totalFloors
              }
            />
          </Box>
        ) : (
          <StyledInput
            label={t('post:totalFloorsInHouse')}
            input={{
              id: 'totalFloors',
              name: 'totalFloors',
              value: totalFloors,
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: formik.handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <ElevatorIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
            helperText={formik.touched.totalFloors && formik.errors.totalFloors}
          />
        )}
        {/* Renovation */}
        <StyledToggleButton
          title={t('post:renovation')}
          value={renovation}
          toggleProps={{
            onChange: handleRenovationChange,
            orientation: width && width < 900 ? 'vertical' : 'horizontal',
            // fullWidth: width && width < 900,
          }}
          values={[
            {
              value: Renovation.cosmetic,
              description: t('post:cosmetic'),
            },
            {
              value: Renovation.designer,
              description: t('post:designer'),
            },
            {
              value: Renovation.noRenovation,
              description: t('post:noRenovation'),
            },
          ]}
          helperText={formik.touched.renovation && formik.errors.renovation}
        />
        {/* Documented */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name={'documented'}
                checked={documented}
                onChange={formik.handleChange}
              />
            }
            label={t('post:documented')}
          />
        </FormGroup>
        {/* Redevelopment */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name={'redevelopment'}
                checked={redevelopment}
                onChange={formik.handleChange}
              />
            }
            label={t('post:redevelopment')}
          />
        </FormGroup>
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

export default EditPostEstateInfo;
