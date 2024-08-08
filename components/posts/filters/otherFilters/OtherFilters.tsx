import React, { FC, Fragment, useState, useContext, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OtherFloorFilters from './OtherFloorFilters';
import OtherSqmFilters from './OtherSqmFilters';
import { AppContext } from '../../../../store/appContext';
import { pushToNewPostsRoute } from '../../../../actions/posts';
import useWindowSize from '../../../../utils/hooks/useWindowSize';
import CloseIcon from '../../../icons/CloseIcon';
import VideoIcon from '../../../icons/VideoIcon';
import UserIcon from '../../../icons/UserIcon';
import HammerIcon from '../../../icons/HammerIcon';
import DocumentIcon from '../../../icons/DocumentIcon';
import { EstateType, PostFilters } from '../../../../types';
import StyledSingleToogleButton from '../../../layout/StyledSingleToogleButton';

interface OtherFiltersState {
  livingRoomsSqmMin: string;
  livingRoomsSqmMax: string;
  kitchenSqmMin: string;
  kitchenSqmMax: string;
  totalFloorsMin: string;
  totalFloorsMax: string;
  hasVideo: boolean;
  documented: boolean;
  fromOwner: boolean;
  withoutRedevelopment: boolean;
}

const getDefaultState = (filters: PostFilters): OtherFiltersState => {
  const defaultLivingRoomsSqmMin =
    Number(filters.livingRoomsSqmMin) > 0
      ? filters.livingRoomsSqmMin?.toString() ?? ''
      : '';
  const defaultLivingRoomsSqmMax =
    Number(filters.livingRoomsSqmMax) > 0
      ? filters.livingRoomsSqmMax?.toString() ?? ''
      : '';

  const defaultKitchenSqmMin =
    Number(filters.kitchenSqmMin) > 0
      ? filters.kitchenSqmMin?.toString() ?? ''
      : '';
  const defaultKitchenSqmMax =
    Number(filters.kitchenSqmMax) > 0
      ? filters.kitchenSqmMax?.toString() ?? ''
      : '';

  const defaultTotalFloorsMin =
    Number(filters.totalFloorsMin) > 0
      ? filters.totalFloorsMin?.toString() ?? ''
      : '';
  const defaultTotalFloorsMax =
    Number(filters.totalFloorsMax) > 0
      ? filters.totalFloorsMax?.toString() ?? ''
      : '';

  return {
    livingRoomsSqmMin: defaultLivingRoomsSqmMin,
    livingRoomsSqmMax: defaultLivingRoomsSqmMax,
    kitchenSqmMin: defaultKitchenSqmMin,
    kitchenSqmMax: defaultKitchenSqmMax,
    totalFloorsMin: defaultTotalFloorsMin,
    totalFloorsMax: defaultTotalFloorsMax,
    hasVideo: filters.hasVideo,
    documented: filters.documented,
    fromOwner: filters.fromOwner,
    withoutRedevelopment: filters.withoutRedevelopment,
  };
};

const OtherFilters: FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();

  const fullScreen = (width ?? 0) < 900;

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [state, setState] = useState<OtherFiltersState>(
    getDefaultState(filters),
  );
  const [open, setOpen] = useState<boolean>(false);

  const {
    livingRoomsSqmMin,
    livingRoomsSqmMax,
    kitchenSqmMin,
    kitchenSqmMax,
    totalFloorsMin,
    totalFloorsMax,
    hasVideo,
    documented,
    fromOwner,
    withoutRedevelopment,
  } = state;

  const handleOnClick = (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSave = () => {
    pushToNewPostsRoute({
      ...filters,
      livingRoomsSqmMin: Number(livingRoomsSqmMin),
      livingRoomsSqmMax: Number(livingRoomsSqmMax),
      kitchenSqmMin: Number(kitchenSqmMin),
      kitchenSqmMax: Number(kitchenSqmMax),
      totalFloorsMin: Number(totalFloorsMin),
      totalFloorsMax: Number(totalFloorsMax),
      hasVideo,
      documented,
      fromOwner,
      withoutRedevelopment,
      pagination: {
        current: 1,
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    setState(getDefaultState(filters));
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleToggleButtonChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: 'hasVideo' | 'documented' | 'fromOwner' | 'withoutRedevelopment',
  ) => {
    setState((prevState) => {
      return { ...prevState, [value]: !prevState[value] };
    });
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleOnClick}>
        {t('filters:otherFilters')}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            width: { md: '800px' },
            maxWidth: { md: '800px' },
          },
        }}
      >
        <DialogTitle>
          {t('filters:otherFilters')}
          {
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                p: 2,
                color: (theme) => {
                  return theme.palette.mode === 'light'
                    ? theme.palette.grey[500]
                    : theme.palette.grey[300];
                },
              }}
            >
              <CloseIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          }
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              mx: 5,
            }}
          >
            <OtherSqmFilters
              livingRoomsSqmMin={livingRoomsSqmMin}
              livingRoomsSqmMax={livingRoomsSqmMax}
              kitchenSqmMin={kitchenSqmMin}
              kitchenSqmMax={kitchenSqmMax}
              handleChange={handleChange}
            />
            {filters.estateType === EstateType.apartment && (
              <OtherFloorFilters
                totalFloorsMin={totalFloorsMin}
                totalFloorsMax={totalFloorsMax}
                handleChange={handleChange}
              />
            )}
            <Typography
              variant="h6"
              sx={{
                my: '1rem',
              }}
            >
              {t('post:additionalFilters')}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'wrap',
                gap: '5px',
              }}
            >
              <StyledSingleToogleButton
                name="hasVideo"
                value={hasVideo}
                title={t('post:hasVideo')}
                icon={<VideoIcon />}
                onChange={handleToggleButtonChange}
              />
              <StyledSingleToogleButton
                name="documented"
                value={documented}
                title={t('post:documented')}
                icon={<DocumentIcon />}
                onChange={handleToggleButtonChange}
              />
              <StyledSingleToogleButton
                name="fromOwner"
                value={fromOwner}
                title={t('post:fromOwner')}
                icon={<UserIcon />}
                onChange={handleToggleButtonChange}
              />
              <StyledSingleToogleButton
                name="withoutRedevelopment"
                value={withoutRedevelopment}
                title={t('post:withoutRedevelopment')}
                icon={<HammerIcon />}
                onChange={handleToggleButtonChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSave}>
            {t('filters:saveDistrictFilter')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default OtherFilters;
