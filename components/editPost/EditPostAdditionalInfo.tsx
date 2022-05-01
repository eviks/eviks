import React, { FC, useState, useContext, Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StepTitle from './StepTitle';
import StyledInput from '../StyledInput';
import StyledSingleToogleButton from '../StyledSingleToogleButton';
import { AppContext } from '../../store/appContext';
import { updatePost } from '../../actions/post';
import BalconyIcon from '../icons/BalconyIcon';
import KidsIcon from '../icons/KidsIcon';
import PetsIcon from '../icons/PetsIcon';
import GarageIcon from '../icons/GarageIcon';
import PoolIcon from '../icons/PoolIcon';
import BathhouseIcon from '../icons/BathhouseIcon';
import KitchenFurnitureIcon from '../icons/KitchenFurnitureIcon';
import FurnitureIcon from '../icons/FurnitureIcon';
import TVIcon from '../icons/TVIcon';
import PhoneIcon from '../icons/PhoneIcon';
import InternetIcon from '../icons/InternetIcon';
import ElectricityIcon from '../icons/ElectricityIcon';
import GasIcon from '../icons/GasIcon';
import WaterIcon from '../icons/WaterIcon';
import HeatIcon from '../icons/HeatIcon';
import ConditionerIcon from '../icons/ConditionerIcon';
import WashingMachineIcon from '../icons/WashingMachineIcon';
import DishwasherIcon from '../icons/DishwasherIcon';
import RefrigeratorIcon from '../icons/RefrigeratorIcon';
import { DealType, EstateType } from '../../types';

interface AdditionalInfo {
  description: string;
  balcony: boolean;
  furniture: boolean;
  kitchenFurniture: boolean;
  cableTv: boolean;
  phone: boolean;
  internet: boolean;
  electricity: boolean;
  gas: boolean;
  water: boolean;
  heating: boolean;
  tv: boolean;
  conditioner: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  refrigerator: boolean;
  kidsAllowed: boolean;
  petsAllowed: boolean;
  garage: boolean;
  pool: boolean;
  bathhouse: boolean;

  [key: string]: boolean | string;
}

const EditPostAdditionalInfo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
    dispatch,
  } = useContext(AppContext);

  const [additionalInfoState, setAdditionalInfo] = useState<AdditionalInfo>({
    description: (post.lastStep || -1) >= 4 ? post.description ?? '' : '',
    balcony: (post.lastStep || -1) >= 4 ? post.balcony ?? false : false,
    furniture: (post.lastStep || -1) >= 4 ? post.furniture ?? false : false,
    kitchenFurniture:
      (post.lastStep || -1) >= 4 ? post.kitchenFurniture ?? false : false,
    cableTv: (post.lastStep || -1) >= 4 ? post.cableTv ?? false : false,
    phone: (post.lastStep || -1) >= 4 ? post.phone ?? false : false,
    internet: (post.lastStep || -1) >= 4 ? post.internet ?? false : false,
    electricity: (post.lastStep || -1) >= 4 ? post.electricity ?? false : false,
    gas: (post.lastStep || -1) >= 4 ? post.gas ?? false : false,
    water: (post.lastStep || -1) >= 4 ? post.water ?? false : false,
    heating: (post.lastStep || -1) >= 4 ? post.heating ?? false : false,
    tv: (post.lastStep || -1) >= 4 ? post.tv ?? false : false,
    conditioner: (post.lastStep || -1) >= 4 ? post.conditioner ?? false : false,
    washingMachine:
      (post.lastStep || -1) >= 4 ? post.washingMachine ?? false : false,
    dishwasher: (post.lastStep || -1) >= 4 ? post.dishwasher ?? false : false,
    refrigerator:
      (post.lastStep || -1) >= 4 ? post.refrigerator ?? false : false,
    kidsAllowed: (post.lastStep || -1) >= 4 ? post.kidsAllowed ?? false : false,
    petsAllowed: (post.lastStep || -1) >= 4 ? post.petsAllowed ?? false : false,
    garage: (post.lastStep || -1) >= 4 ? post.garage ?? false : false,
    pool: (post.lastStep || -1) >= 4 ? post.pool ?? false : false,
    bathhouse: (post.lastStep || -1) >= 4 ? post.bathhouse ?? false : false,
  });

  const {
    description,
    balcony,
    furniture,
    kitchenFurniture,
    cableTv,
    phone,
    internet,
    electricity,
    gas,
    water,
    heating,
    tv,
    conditioner,
    washingMachine,
    dishwasher,
    refrigerator,
    kidsAllowed,
    petsAllowed,
    garage,
    pool,
    bathhouse,
  } = additionalInfoState;

  const updatePostAndDispatch = (step: number) => {
    updatePost({
      ...post,
      description,
      balcony,
      furniture,
      kitchenFurniture,
      cableTv,
      phone,
      internet,
      electricity,
      gas,
      water,
      heating,
      tv,
      conditioner,
      washingMachine,
      dishwasher,
      refrigerator,
      kidsAllowed,
      petsAllowed,
      garage,
      pool,
      bathhouse,
      step,
      lastStep: Math.max(4, post.lastStep ?? 4),
    })(dispatch);
  };

  const isSale = post.dealType === DealType.sale;
  const isHouse = post.estateType === EstateType.house;

  const handleToggleButtonChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string,
  ) => {
    setAdditionalInfo((prevState) => {
      return { ...prevState, [value]: !prevState[value] };
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAdditionalInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updatePostAndDispatch(5);
  };

  const handlePrevStepClick = () => {
    updatePostAndDispatch(3);
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Container
        disableGutters
        sx={{
          py: { md: 4 },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'start',
        }}
      >
        <StepTitle title={t('post:additionalInfo')} />
        <StyledInput
          value={description}
          name="description"
          label={t('post:description')}
          input={{
            id: 'description',
            fullWidth: true,
            type: 'text',
            placeholder: t('post:descriptionHint'),
            multiline: true,
            rows: 4,
            onChange: handleChange,
          }}
        />
        <Container
          sx={{
            display: 'flex',
            flexFlow: 'wrap',
            gap: '5px',
          }}
        >
          {!isSale && (
            <Fragment>
              {/* Kids allowed */}
              <StyledSingleToogleButton
                name="kidsAllowed"
                value={kidsAllowed}
                title={t('post:kidsAllowed')}
                icon={<KidsIcon />}
                onChange={handleToggleButtonChange}
              />
              {/* Pets allowed */}
              <StyledSingleToogleButton
                name="petsAllowed"
                value={petsAllowed}
                title={t('post:petsAllowed')}
                icon={<PetsIcon />}
                onChange={handleToggleButtonChange}
              />
            </Fragment>
          )}
          {isHouse && (
            <Fragment>
              {/* Garage */}
              <StyledSingleToogleButton
                name="garage"
                value={garage}
                title={t('post:garage')}
                icon={<GarageIcon />}
                onChange={handleToggleButtonChange}
              />
              {/* Pool */}
              <StyledSingleToogleButton
                name="pool"
                value={pool}
                title={t('post:pool')}
                icon={<PoolIcon />}
                onChange={handleToggleButtonChange}
              />
              {/* Bathhouse */}
              <StyledSingleToogleButton
                name="bathhouse"
                value={bathhouse}
                title={t('post:bathhouse')}
                icon={<BathhouseIcon />}
                onChange={handleToggleButtonChange}
              />
            </Fragment>
          )}
          {/* Balcony */}
          <StyledSingleToogleButton
            name="balcony"
            value={balcony}
            title={t('post:balcony')}
            icon={<BalconyIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Kitchen furniture */}
          <StyledSingleToogleButton
            name="kitchenFurniture"
            value={kitchenFurniture}
            title={t('post:kitchenFurniture')}
            icon={<KitchenFurnitureIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Furniture */}
          <StyledSingleToogleButton
            name="furniture"
            value={furniture}
            title={t('post:furniture')}
            icon={<FurnitureIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Cable TV */}
          <StyledSingleToogleButton
            name="cableTv"
            value={cableTv}
            title={t('post:cableTv')}
            icon={<TVIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Phone */}
          <StyledSingleToogleButton
            name="phone"
            value={phone}
            title={t('post:phone')}
            icon={<PhoneIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Internet */}
          <StyledSingleToogleButton
            name="internet"
            value={internet}
            title={t('post:internet')}
            icon={<InternetIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Electricity */}
          <StyledSingleToogleButton
            name="electricity"
            value={electricity}
            title={t('post:electricity')}
            icon={<ElectricityIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Gas */}
          <StyledSingleToogleButton
            name="gas"
            value={gas}
            title={t('post:gas')}
            icon={<GasIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Water */}
          <StyledSingleToogleButton
            name="water"
            value={water}
            title={t('post:water')}
            icon={<WaterIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Heating */}
          <StyledSingleToogleButton
            name="heating"
            value={heating}
            title={t('post:heating')}
            icon={<HeatIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* TV */}
          <StyledSingleToogleButton
            name="tv"
            value={tv}
            title={t('post:tv')}
            icon={<TVIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Conditioner */}
          <StyledSingleToogleButton
            name="conditioner"
            value={conditioner}
            title={t('post:conditioner')}
            icon={<ConditionerIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Washing machine */}
          <StyledSingleToogleButton
            name="washingMachine"
            value={washingMachine}
            title={t('post:washingMachine')}
            icon={<WashingMachineIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Dishwasher */}
          <StyledSingleToogleButton
            name="dishwasher"
            value={dishwasher}
            title={t('post:dishwasher')}
            icon={<DishwasherIcon />}
            onChange={handleToggleButtonChange}
          />
          {/* Refrigerator */}
          <StyledSingleToogleButton
            name="refrigerator"
            value={refrigerator}
            title={t('post:refrigerator')}
            icon={<RefrigeratorIcon />}
            onChange={handleToggleButtonChange}
          />
        </Container>
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

export default EditPostAdditionalInfo;
