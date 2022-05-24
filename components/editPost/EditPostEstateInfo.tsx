import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StepTitle from './StepTitle';
import StyledInput from '../layout/StyledInput';
import StyledToggleButton from '../layout/StyledToggleButton';
import DoorIcon from '../icons/DoorIcon';
import SqmIcon from '../icons/SqmIcon';
import GardenIcon from '../icons/GardenIcon';
import ElevatorIcon from '../icons/ElevatorIcon';
import DocumentIcon from '../icons/DocumentIcon';
import HammerIcon from '../icons/HammerIcon';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { EstateType, Post, Renovation } from '../../types';

interface EstateInfo {
  rooms: string;
  sqm: string;
  livingRoomsSqm: string;
  kitchenSqm: string;
  lotSqm: string;
  floor: string;
  totalFloors: string;
  renovation?: Renovation;
  documented: boolean;
  redevelopment: boolean;
}

const getDefaultState = (post: Post): EstateInfo => {
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

  const [estateInfoState, setEstateInfo] = useState<EstateInfo>(
    getDefaultState(post),
  );

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
  } = estateInfoState;

  useEffect(() => {
    ValidatorForm.addValidationRule('floorIsValid', (value) => {
      return Number(value) <= Number(totalFloors);
    });
  }, [totalFloors]);

  useLayoutEffect(() => {
    return () => {
      ValidatorForm.removeValidationRule('floorIsValid');
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const isBoolean = name === 'documented' || name === 'redevelopment';

    setEstateInfo((prevState) => {
      return { ...prevState, [name]: isBoolean ? checked : value };
    });
  };

  const updatePostAndDispatch = (step: number) => {
    updatePost({
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updatePostAndDispatch(3);
  };

  const handlePrevStepClick = () => {
    updatePostAndDispatch(1);
  };

  const handleRenovationChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: Renovation,
  ) => {
    setEstateInfo((prevState) => {
      return { ...prevState, renovation: newValue };
    });
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
        <StepTitle title={t('post:estateInfo')} />
        {/* Rooms */}
        <StyledInput
          validators={['required', 'minNumber: 1']}
          value={rooms}
          name="rooms"
          errorMessages={[
            t('common:errorRequiredField'),
            t('common:errorRequiredField'),
          ]}
          label={t('post:rooms')}
          input={{
            id: 'rooms',
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <DoorIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: { md: 'flex', xs: 'inherit' },
            gap: { md: '12px', xs: '0px' },
          }}
        >
          {/* Sqm */}
          <StyledInput
            validators={['required', 'minNumber: 1']}
            value={sqm}
            name="sqm"
            errorMessages={[
              t('common:errorRequiredField'),
              t('common:errorRequiredField'),
            ]}
            label={t('post:sqm')}
            input={{
              id: 'sqm',
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <SqmIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
          {/* Living rooms sqm */}
          <StyledInput
            value={livingRoomsSqm}
            name="livingRoomsSqm"
            label={t('post:livingRoomsSqm')}
            input={{
              id: 'livingRoomsSqm',
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <SqmIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
          {/* Kitchen sqm */}
          <StyledInput
            value={kitchenSqm}
            name="kitchenSqm"
            label={t('post:kitchenSqm')}
            input={{
              id: 'kitchenSqm',
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: handleChange,
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
            validators={['required', 'minNumber: 1']}
            value={lotSqm}
            name="lotSqm"
            errorMessages={[
              t('common:errorRequiredField'),
              t('common:errorRequiredField'),
            ]}
            label={t('post:lotSqm')}
            input={{
              id: 'lotSqm',
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <GardenIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        {/* Floor */}
        {!isHouse ? (
          <Box
            sx={{
              display: { md: 'flex', xs: 'inherit' },
              gap: { md: '12px', xs: '0px' },
            }}
          >
            <StyledInput
              validators={['required', 'minNumber: 1', 'floorIsValid']}
              value={floor}
              name="floor"
              errorMessages={[
                t('common:errorRequiredField'),
                t('common:errorRequiredField'),
                t('post:errorFloor'),
              ]}
              label={t('post:floor')}
              input={{
                id: 'floor',
                type: 'number',
                sx: {
                  width: '180px',
                },
                onChange: handleChange,
                startAdornment: (
                  <InputAdornment position="start">
                    <ElevatorIcon sx={{ ml: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
            <StyledInput
              validators={['required', 'minNumber: 1']}
              value={totalFloors}
              name="totalFloors"
              errorMessages={[
                t('common:errorRequiredField'),
                t('common:errorRequiredField'),
              ]}
              label={' '}
              input={{
                id: 'totalFloors',
                type: 'number',
                sx: {
                  width: '180px',
                },
                onChange: handleChange,
              }}
            />
          </Box>
        ) : (
          <StyledInput
            value={totalFloors}
            name="totalFloors"
            label={t('post:totalFloors')}
            input={{
              id: 'totalFloors',
              type: 'number',
              sx: {
                width: '180px',
              },
              onChange: handleChange,
              startAdornment: (
                <InputAdornment position="start">
                  <ElevatorIcon sx={{ ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        {/* Renovation */}
        <StyledToggleButton
          name="dealType"
          title={t('post:renovation')}
          value={renovation}
          toggleProps={{
            orientation: width && width < 900 ? 'vertical' : 'horizontal',
            fullWidth: width && width < 900,
          }}
          onChange={handleRenovationChange}
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
          validators={['required']}
          errorMessages={[t('common:fieldIsRequired')]}
        />
        {/* Documented */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DocumentIcon sx={{ mr: 2 }} />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name={'documented'}
                  checked={documented}
                  onChange={handleChange}
                />
              }
              label={t('post:documented')}
            />
          </FormGroup>
        </Box>
        {/* Redevelopment */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HammerIcon sx={{ mr: 2 }} />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name={'redevelopment'}
                  checked={redevelopment}
                  onChange={handleChange}
                />
              }
              label={t('post:redevelopment')}
            />
          </FormGroup>
        </Box>
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

export default EditPostEstateInfo;
