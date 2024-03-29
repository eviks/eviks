import React, { FC, Fragment, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StepTitle from './StepTitle';
import StyledInput from '../layout/StyledInput';
import CalendarIcon from '../icons/CalendarIcon';
import MeasuringIcon from '../icons/MeasuringIcon';
import { AppContext } from '../../store/appContext';
import { setPostData } from '../../actions/post';
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

  const setPostDataAndDispatch = (step: number) => {
    setPostData({
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

    setPostDataAndDispatch(4);
  };

  const handlePrevStepClick = () => {
    setPostDataAndDispatch(2);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          label={t('post:yearBuild')}
          input={{
            id: 'yearBuild',
            name: 'yearBuild',
            value: yearBuild,
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        {/* Ceiling height */}
        <StyledInput
          label={t('post:ceilingHeight')}
          input={{
            id: 'ceilingHeight',
            name: 'ceilingHeight',
            value: ceilingHeight,
            type: 'number',
            sx: {
              width: '180px',
            },
            onChange: handleChange,
            startAdornment: (
              <InputAdornment position="start">
                <MeasuringIcon sx={{ ml: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        {post.estateType === EstateType.apartment && (
          <Fragment>
            {/* Elevator */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'elevator'}
                    checked={elevator}
                    onChange={handleChange}
                  />
                }
                label={t('post:elevator')}
              />
            </FormGroup>
            {/* Parking lot */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={'parkingLot'}
                    checked={parkingLot}
                    onChange={handleChange}
                  />
                }
                label={t('post:parkingLot')}
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

export default EditPostBuildingInfo;
