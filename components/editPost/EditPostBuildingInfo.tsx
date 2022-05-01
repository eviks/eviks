import React, { FC, Fragment, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import StepTitle from './StepTitle';
import StyledInput from '../StyledInput';
import CalendarIcon from '../icons/CalendarIcon';
import MeasuringIcon from '../icons/MeasuringIcon';
import ElevatorIcon from '../icons/ElevatorIcon';
import ParkingLotIcon from '../icons/ParkingLotIcon';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
import { EstateType, Post } from '../../types';

interface BuildingInfo {
  yearBuild: string;
  ceilingHeight: string;
  elevator: boolean;
  parkingLot: boolean;
}

const getDefaultState = (post: Post): BuildingInfo => {
  const defaultYearBuild =
    Number(post.yearBuild) > 0 ? post.yearBuild?.toString() ?? '' : '';
  const defaultCeilingHeight =
    Number(post.ceilingHeight) > 0 ? post.ceilingHeight?.toString() ?? '' : '';

  return {
    yearBuild: (post.lastStep || -1) >= 3 ? defaultYearBuild : '',
    ceilingHeight: (post.lastStep || -1) >= 3 ? defaultCeilingHeight : '',
    elevator: (post.lastStep || -1) >= 3 ? post.elevator ?? false : false,
    parkingLot: (post.lastStep || -1) >= 3 ? post.parkingLot ?? false : false,
  };
};

const EditPostBuildingInfo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const [buildingInfoState, setBuildingInfo] = useState<BuildingInfo>(
    getDefaultState(post),
  );

  const { yearBuild, ceilingHeight, elevator, parkingLot } = buildingInfoState;

  const updatePostAndDispatch = (step: number) => {
    updatePost({
      ...post,
      yearBuild: Number(yearBuild),
      ceilingHeight: Number(ceilingHeight),
      elevator,
      parkingLot,
      step,
      lastStep: Math.max(3, post.lastStep ?? 3),
    })(dispatch);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    const isBoolean = name === 'elevator' || name === 'parkingLot';

    setBuildingInfo((prevState) => {
      return { ...prevState, [name]: isBoolean ? checked : value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updatePostAndDispatch(4);
  };

  const handlePrevStepClick = () => {
    updatePostAndDispatch(2);
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
        <StepTitle title={t('post:buildingInfo')} />
        {/* Year build */}
        <StyledInput
          value={yearBuild}
          name="yearBuild"
          label={t('post:yearBuild')}
          input={{
            id: 'yearBuild',
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon sx={{ mx: 2 }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Ceiling height */}
        <StyledInput
          value={ceilingHeight}
          name="ceilingHeight"
          label={t('post:ceilingHeight')}
          input={{
            id: 'ceilingHeight',
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <MeasuringIcon sx={{ mx: 2 }} />
              </InputAdornment>
            ),
          }}
        />
        {post.estateType === EstateType.apartment && (
          <Fragment>
            {/* Elevator */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ElevatorIcon sx={{ mr: 2 }} />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name={'elevator'}
                      checked={elevator}
                      onChange={handleChange}
                    />
                  }
                  label={t('post:elevator')}
                />
              </FormGroup>
            </Box>
            {/* Parking lot */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ParkingLotIcon sx={{ mr: 2 }} />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name={'parkingLot'}
                      checked={parkingLot}
                      onChange={handleChange}
                    />
                  }
                  label={t('post:parkingLot')}
                />
              </FormGroup>
            </Box>
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

export default EditPostBuildingInfo;
