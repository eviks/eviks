import React, { FC, useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../../../store/appContext';
import { pushToNewPostsRoute } from '../../../actions/posts';
import { SortType } from '../../../types';

interface SortingProps {
  title: string;
}

const Sorting: FC<SortingProps> = ({ title }) => {
  const { t } = useTranslation();

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const setSorting = (value: SortType) => {
    pushToNewPostsRoute({
      ...filters,
      sort: value,
      pagination: {
        current: 1,
      },
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (value: string) => {
    setAnchorEl(null);
    let enumValue = SortType.dateDsc;
    if (value === 'priceAsc') enumValue = SortType.priceAsc;
    if (value === 'priceDsc') enumValue = SortType.priceDsc;
    if (value === 'sqmAsc') enumValue = SortType.sqmAsc;
    if (value === 'sqmDsc') enumValue = SortType.sqmDsc;
    if (value === 'dateAsc') enumValue = SortType.dateAsc;
    if (value === 'dateDsc') enumValue = SortType.dateDsc;
    setSorting(enumValue);
  };

  return filters.city ? (
    <>
      <Button
        type="button"
        variant="outlined"
        id="sort-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
      >
        <MenuItem
          onClick={() => {
            return handleMenuSelect('priceAsc');
          }}
        >
          {t('filters:priceAsc')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            return handleMenuSelect('priceDsc');
          }}
        >
          {t('filters:priceDsc')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            return handleMenuSelect('sqmAsc');
          }}
        >
          {t('filters:sqmAsc')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            return handleMenuSelect('sqmDsc');
          }}
        >
          {t('filters:sqmDsc')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            return handleMenuSelect('dateAsc');
          }}
        >
          {t('filters:dateAsc')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            return handleMenuSelect('dateDsc');
          }}
        >
          {t('filters:dateDsc')}
        </MenuItem>
      </Menu>
    </>
  ) : null;
};

export default Sorting;
