import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StepTitle from './StepTitle';
import StyledToggleButtonRounded from '../layout/StyledToggleButtonRounded';
import { AppContext } from '../../store/appContext';
import { setPostData } from '../../actions/post';
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
  apartmentType?: ApartmentType | null;
  dealType?: DealType;
}

const EditPostGeneralInfo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const [showApartmentType, setApartmentTypeVisability] = useState<boolean>(
    ((post.lastStep || -1) >= 0 ? post.estateType : undefined) ===
      EstateType.apartment,
  );

  const validationSchema = yup.object({
    userType: yup.string().nullable().required(t('common:fieldIsRequired')),
    estateType: yup.string().nullable().required(t('common:fieldIsRequired')),
    apartmentType: yup
      .string()
      .nullable()
      .test(
        'apartmentTypeIsRequired',
        t('common:fieldIsRequired'),
        function checkIfApartmentTypeIsRequired(value) {
          return this.parent.estateType === EstateType.house || value !== null;
        },
      ),
    dealType: yup.string().nullable().required(t('common:fieldIsRequired')),
  });

  const formik = useFormik<GeneralInfoState>({
    initialValues: {
      userType: (post.lastStep || -1) >= 0 ? post.userType : undefined,
      estateType: (post.lastStep || -1) >= 0 ? post.estateType : undefined,
      apartmentType:
        (post.lastStep || -1) >= 0 ? post.apartmentType : undefined,
      dealType: (post.lastStep || -1) >= 0 ? post.dealType : undefined,
    },
    validationSchema,
    onSubmit: async (values: GeneralInfoState) => {
      setPostData({
        ...post,
        ...values,
        apartmentType:
          values.apartmentType === null ? undefined : values.apartmentType,
        lotSqm: values.estateType !== EstateType.house ? 0 : post.lotSqm,
        floor: values.estateType !== EstateType.apartment ? 0 : post.floor,
        elevator:
          values.estateType === EstateType.house ? false : post.elevator,
        parkingLot:
          values.estateType === EstateType.house ? false : post.parkingLot,
        kidsAllowed:
          values.dealType === DealType.sale ? false : post.kidsAllowed,
        petsAllowed:
          values.dealType === DealType.sale ? false : post.kidsAllowed,
        garage:
          values.estateType === EstateType.apartment ? false : post.garage,
        pool: values.estateType === EstateType.apartment ? false : post.pool,
        bathhouse:
          values.estateType === EstateType.apartment ? false : post.bathhouse,
        installmentOfPayment:
          values.dealType !== DealType.sale ? false : post.installmentOfPayment,
        prepayment: values.dealType === DealType.sale ? false : post.prepayment,
        municipalServicesIncluded:
          values.dealType === DealType.sale
            ? false
            : post.municipalServicesIncluded,
        step: 1,
        lastStep: Math.max(0, post.lastStep ?? 0),
      })(dispatch);
    },
  });

  const { userType, estateType, apartmentType, dealType } = formik.values;

  const handleUserTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: UserType,
  ) => {
    formik.setFieldValue('userType', value);
  };

  const handleEstateTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: EstateType,
  ) => {
    formik.setFieldValue('apartmentType', null);
    formik.setFieldValue('estateType', value);
    setApartmentTypeVisability(value === EstateType.apartment);
  };

  const handleApartmentTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: ApartmentType,
  ) => {
    formik.setFieldValue('apartmentType', value);
  };

  const handleDealTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: DealType,
  ) => {
    formik.setFieldValue('dealType', value);
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
        <StepTitle title={t('post:generalInfo')} />
        {/* User type */}
        <StyledToggleButtonRounded
          title={t('post:userTypeTitle')}
          value={userType}
          toggleProps={{
            exclusive: true,
            onChange: handleUserTypeChange,
            sx: { mb: 4 },
          }}
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
          helperText={formik.touched.userType && formik.errors.userType}
        />
        {/* Estate type */}
        <StyledToggleButtonRounded
          title={t('post:estateTypeTitle')}
          value={estateType}
          toggleProps={{
            exclusive: true,
            onChange: handleEstateTypeChange,
            sx: { mb: 4 },
          }}
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
          helperText={formik.touched.estateType && formik.errors.estateType}
        />
        {/* Apartment type */}
        {showApartmentType && (
          <StyledToggleButtonRounded
            title={t('post:apartmentTypeTitle')}
            value={apartmentType}
            toggleProps={{
              exclusive: true,
              onChange: handleApartmentTypeChange,
              sx: { mb: 4 },
            }}
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
            helperText={
              formik.touched.apartmentType && formik.errors.apartmentType
            }
          />
        )}
        {/* Deal type */}
        <StyledToggleButtonRounded
          title={t('post:dealTypeTitle')}
          value={dealType}
          toggleProps={{
            exclusive: true,
            onChange: handleDealTypeChange,
            sx: { mb: 4 },
          }}
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
          helperText={formik.touched.dealType && formik.errors.dealType}
        />
        <Button
          type="submit"
          variant="contained"
          disableElevation
          sx={{ mt: 1, py: 1 }}
        >
          {t('post:next')}
        </Button>
      </Container>
    </form>
  );
};

export default EditPostGeneralInfo;
