import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import InformationIcon from '../icons/InformationIcon';
import MarkerIcon from '../icons/MarkerIcon';
import HouseIcon from '../icons/HouseIcon';
import ApartmentIcon from '../icons/ApartmentIcon';
import PlusIcon from '../icons/PlusIcon';
import VideoIcon from '../icons/Video';
import CameraIcon from '../icons/CameraIcon';
import MoneyIcon from '../icons/MoneyIcon';
import PhoneCallIcon from '../icons/PhoneCallIcon';

const EditPostStepper: FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation();

  const steps = [
    t('post:generalInfo'),
    t('post:address'),
    t('post:estateInfo'),
    t('post:buildingInfo'),
    t('post:additionalInfo'),
    t('post:video'),
    t('post:images'),
    t('post:priceTitle'),
    t('post:contactTitle'),
  ];

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => {
    return {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[800],
      zIndex: 1,
      color: theme.palette.primary.contrastText,
      width: 40,
      height: 40,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      ...(ownerState.active && {
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      }),
      ...(ownerState.completed && {
        backgroundColor: theme.palette.primary.main,
      }),
    };
  });

  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <InformationIcon />,
      2: <MarkerIcon />,
      3: <HouseIcon />,
      4: <ApartmentIcon />,
      5: <PlusIcon />,
      6: <VideoIcon />,
      7: <CameraIcon />,
      8: <MoneyIcon />,
      9: <PhoneCallIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };

  return (
    <Stepper
      sx={{ pt: 5, display: 'flex', alignItems: 'start' }}
      activeStep={step ?? 0 + 1}
      orientation={'vertical'}
      connector={null}
    >
      {steps.map((label) => {
        return (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} sx={{ mt: 0 }}>
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default EditPostStepper;
