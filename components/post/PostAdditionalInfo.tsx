import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import { Post } from '../../types';

const AdditionInfoItem: FC<{
  value?: boolean;
  label: string;
  icon: JSX.Element;
}> = ({ value, label, icon }) => {
  if (!value) return null;

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography fontSize={16}>{label}</Typography>
      </Box>
    </Grid>
  );
};

const PostAdditionalInfo: FC<{ post: Post }> = ({ post }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ my: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} sx={{ mb: 2 }}>
        {t('post:postDetailAdditional')}
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={1}>
        <AdditionInfoItem
          value={post.kidsAllowed}
          icon={<KidsIcon fontSize="large" />}
          label={t('post:kidsAllowed')}
        />
        <AdditionInfoItem
          value={post.petsAllowed}
          icon={<PetsIcon fontSize="large" />}
          label={t('post:petsAllowed')}
        />
        <AdditionInfoItem
          value={post.garage}
          icon={<GarageIcon fontSize="large" />}
          label={t('post:garage')}
        />
        <AdditionInfoItem
          value={post.pool}
          icon={<PoolIcon fontSize="large" />}
          label={t('post:pool')}
        />
        <AdditionInfoItem
          value={post.bathhouse}
          icon={<BathhouseIcon fontSize="large" />}
          label={t('post:bathhouse')}
        />
        <AdditionInfoItem
          value={post.balcony}
          icon={<BalconyIcon fontSize="large" />}
          label={t('post:balcony')}
        />
        <AdditionInfoItem
          value={post.furniture}
          icon={<FurnitureIcon fontSize="large" />}
          label={t('post:furniture')}
        />
        <AdditionInfoItem
          value={post.kitchenFurniture}
          icon={<KitchenFurnitureIcon fontSize="large" />}
          label={t('post:kitchenFurniture')}
        />
        <AdditionInfoItem
          value={post.cableTv}
          icon={<TVIcon fontSize="large" />}
          label={t('post:cableTv')}
        />
        <AdditionInfoItem
          value={post.phone}
          icon={<PhoneIcon fontSize="large" />}
          label={t('post:phone')}
        />
        <AdditionInfoItem
          value={post.internet}
          icon={<InternetIcon fontSize="large" />}
          label={t('post:internet')}
        />
        <AdditionInfoItem
          value={post.electricity}
          icon={<ElectricityIcon fontSize="large" />}
          label={t('post:electricity')}
        />
        <AdditionInfoItem
          value={post.gas}
          icon={<GasIcon fontSize="large" />}
          label={t('post:gas')}
        />
        <AdditionInfoItem
          value={post.water}
          icon={<WaterIcon fontSize="large" />}
          label={t('post:water')}
        />
        <AdditionInfoItem
          value={post.heating}
          icon={<HeatIcon fontSize="large" />}
          label={t('post:heating')}
        />
        <AdditionInfoItem
          value={post.tv}
          icon={<TVIcon fontSize="large" />}
          label={t('post:tv')}
        />
        <AdditionInfoItem
          value={post.conditioner}
          icon={<ConditionerIcon fontSize="large" />}
          label={t('post:conditioner')}
        />
        <AdditionInfoItem
          value={post.washingMachine}
          icon={<WashingMachineIcon fontSize="large" />}
          label={t('post:washingMachine')}
        />
        <AdditionInfoItem
          value={post.dishwasher}
          icon={<DishwasherIcon fontSize="large" />}
          label={t('post:dishwasher')}
        />
        <AdditionInfoItem
          value={post.refrigerator}
          icon={<RefrigeratorIcon fontSize="large" />}
          label={t('post:refrigerator')}
        />
      </Grid>
    </Box>
  );
};

export default PostAdditionalInfo;
