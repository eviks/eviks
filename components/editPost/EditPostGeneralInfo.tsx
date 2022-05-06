import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StepTitle from './StepTitle';
import StyledToggleButton from '../StyledToggleButton';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
import { UserType, EstateType, ApartmentType, DealType } from '../../types';
import UserIcon from '../icons/UserIcon';
import AgentIcon from '../icons/AgentIcon';
import ApartmentIcon from '../icons/ApartmentIcon';
import HouseIcon from '../icons/HouseIcon';
import NewBuildingIcon from '../icons/NewBuildingIcon';
import SecondaryBuildingIcon from '../icons/SecondaryBuildingIcon';
import SaleIcon from '../icons/SaleIcon';
import RentIcon from '../icons/RentIcon';
import RentPerDayIcon from '../icons/RentPerDayIcon';

interface GeneralInfoState {
  userType?: UserType;
  estateType?: EstateType;
  apartmentType?: ApartmentType;
  dealType?: DealType;
}

const EditPostGeneralInfo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const [generalInfoState, setGeneralInfoState] = useState<GeneralInfoState>({
    userType: (post.lastStep || -1) >= 0 ? post.userType : undefined,
    estateType: (post.lastStep || -1) >= 0 ? post.estateType : undefined,
    apartmentType: (post.lastStep || -1) >= 0 ? post.apartmentType : undefined,
    dealType: (post.lastStep || -1) >= 0 ? post.dealType : undefined,
  });

  const [showApartmentType, setApartmentTypeVisability] = useState<boolean>(
    ((post.lastStep || -1) >= 0 ? post.estateType : undefined) ===
      EstateType.apartment,
  );

  const { userType, estateType, apartmentType, dealType } = generalInfoState;

  const handleUserTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: UserType,
  ) => {
    setGeneralInfoState((prevState) => {
      return { ...prevState, userType: value };
    });
  };

  const handleEstateTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: EstateType,
  ) => {
    setGeneralInfoState((prevState) => {
      return {
        ...prevState,
        estateType: value,
        apartmentType:
          value !== EstateType.apartment ? undefined : prevState.apartmentType,
      };
    });
    setApartmentTypeVisability(value === EstateType.apartment);
  };

  const handleApartmentTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: ApartmentType,
  ) => {
    setGeneralInfoState((prevState) => {
      return { ...prevState, apartmentType: value };
    });
  };

  const handleDealTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: DealType,
  ) => {
    setGeneralInfoState((prevState) => {
      return { ...prevState, dealType: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    updatePost({
      ...post,
      ...generalInfoState,
      lotSqm:
        generalInfoState.estateType !== EstateType.house ? 0 : post.lotSqm,
      floor:
        generalInfoState.estateType !== EstateType.apartment ? 0 : post.floor,
      elevator:
        generalInfoState.estateType === EstateType.house
          ? false
          : post.elevator,
      parkingLot:
        generalInfoState.estateType === EstateType.house
          ? false
          : post.parkingLot,
      kidsAllowed:
        generalInfoState.dealType === DealType.sale ? false : post.kidsAllowed,
      petsAllowed:
        generalInfoState.dealType === DealType.sale ? false : post.kidsAllowed,
      garage:
        generalInfoState.estateType === EstateType.apartment
          ? false
          : post.garage,
      pool:
        generalInfoState.estateType === EstateType.apartment
          ? false
          : post.pool,
      bathhouse:
        generalInfoState.estateType === EstateType.apartment
          ? false
          : post.bathhouse,
      installmentOfPayment:
        generalInfoState.dealType !== DealType.sale
          ? false
          : post.installmentOfPayment,
      prepayment:
        generalInfoState.dealType === DealType.sale ? false : post.prepayment,
      municipalServicesIncluded:
        generalInfoState.dealType === DealType.sale
          ? false
          : post.municipalServicesIncluded,
      step: 1,
      lastStep: Math.max(0, post.lastStep ?? 0),
    })(dispatch);
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
        <StepTitle title={t('post:generalInfo')} />
        {/* User type */}
        <StyledToggleButton
          name="userType"
          title={t('post:userTypeTitle')}
          value={userType}
          width={{ xs: '110px', md: '120px' }}
          height={{ xs: '110px', md: '120px' }}
          padding={3}
          onChange={handleUserTypeChange}
          values={[
            {
              value: UserType.owner,
              description: t('post:owner'),
              icon: <UserIcon />,
            },
            {
              value: UserType.agent,
              description: t('post:agent'),
              icon: <AgentIcon />,
            },
          ]}
          validators={['required']}
          errorMessages={[t('common:fieldIsRequired')]}
        />
        {/* Estate type */}
        <StyledToggleButton
          name="estateType"
          title={t('post:estateTypeTitle')}
          value={estateType}
          width={{ xs: '110px', md: '120px' }}
          height={{ xs: '110px', md: '120px' }}
          padding={3}
          onChange={handleEstateTypeChange}
          values={[
            {
              value: EstateType.apartment,
              description: t('post:apartment'),
              icon: <ApartmentIcon />,
            },
            {
              value: EstateType.house,
              description: t('post:house'),
              icon: <HouseIcon />,
            },
          ]}
          validators={['required']}
          errorMessages={[t('common:fieldIsRequired')]}
        />
        {/* Apartment type */}
        {showApartmentType && (
          <StyledToggleButton
            name="apartmentType"
            title={t('post:apartmentTypeTitle')}
            value={apartmentType}
            width={{ xs: '110px', md: '120px' }}
            height={{ xs: '110px', md: '120px' }}
            padding={3}
            onChange={handleApartmentTypeChange}
            values={[
              {
                value: ApartmentType.newBuilding,
                description: t('post:newBuilding'),
                icon: <NewBuildingIcon />,
              },
              {
                value: ApartmentType.secondaryBuilding,
                description: t('post:secondaryBuilding'),
                icon: <SecondaryBuildingIcon />,
              },
            ]}
            validators={['required']}
            errorMessages={[t('common:fieldIsRequired')]}
          />
        )}
        {/* Deal type */}
        <StyledToggleButton
          name="dealType"
          title={t('post:dealTypeTitle')}
          value={dealType}
          width={{ xs: '110px', md: '120px' }}
          height={{ xs: '110px', md: '120px' }}
          padding={3}
          onChange={handleDealTypeChange}
          values={[
            {
              value: DealType.sale,
              description: t('post:sale'),
              icon: <SaleIcon />,
            },
            {
              value: DealType.rent,
              description: t('post:rent'),
              icon: <RentIcon />,
            },
            {
              value: DealType.rentPerDay,
              description: t('post:rentPerDay'),
              icon: <RentPerDayIcon />,
            },
          ]}
          validators={['required']}
          errorMessages={[t('common:fieldIsRequired')]}
        />
        <Button type="submit" variant="contained" sx={{ mt: 1, py: 1 }}>
          {t('post:next')}
        </Button>
      </Container>
    </ValidatorForm>
  );
};

export default EditPostGeneralInfo;
