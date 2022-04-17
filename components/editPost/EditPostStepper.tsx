import React, { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import InformationIcon from '../icons/InformationIcon';
import MarkerIcon from '../icons/MarkerIcon';
import MetroIcon from '../icons/MetroIcon';

const EditPostStepper: FC<{ step: number }> = ({ step }) => {
  const { t } = useTranslation();

  const steps = [t('post:generalInfo'), t('post:address'), t('post:metro')];

  const ColorlibConnector = styled(StepConnector)(({ theme }) => {
    return {
      [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
      },
      [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          backgroundColor: theme.palette.primary.main,
        },
      },
      [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
          backgroundColor: theme.palette.primary.main,
        },
      },
      [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[300]
            : theme.palette.grey[800],
        borderRadius: 1,
      },
    };
  });

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => {
    return {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[800],
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
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
      3: <MetroIcon />,
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
      sx={{ pt: 5 }}
      activeStep={step ?? 0 + 1}
      alternativeLabel
      connector={<ColorlibConnector />}
    >
      {steps.map((label) => {
        return (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default EditPostStepper;
