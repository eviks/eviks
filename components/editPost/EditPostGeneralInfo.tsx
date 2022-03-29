import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import StyledToggleButton from '../StyledToggleButton';
import { AppContext } from '../../store/appContext';
import { UserType } from '../../types';
import UserIcon from '../icons/UserIcon';
import AgentIcon from '../icons/AgentIcon';

interface GeneralInfoState {
  userType?: UserType;
}

const EditPostGeneralInfo: FC = () => {
  const { t } = useTranslation();

  const {
    state: { post },
  } = useContext(AppContext);

  const [generalInfoState, setGeneralInfoState] = useState<GeneralInfoState>({
    userType: (post.lastStep || -1) >= 0 ? post.userType : undefined,
  });

  const { userType } = generalInfoState;

  const handleUserTypeChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: UserType,
  ) => {
    setGeneralInfoState((prevState) => {
      return { ...prevState, userType: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <StyledToggleButton
        name="userType"
        value={userType}
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
      <Button type="submit" variant="contained" sx={{ mt: 1, py: 1 }}>
        {t('post:next')}
      </Button>
    </ValidatorForm>
  );
};

export default EditPostGeneralInfo;
