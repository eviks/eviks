import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import FilterButton from './FilterButton';
import PriceFilter from '../filters/PriceFilter';

const SearchBar: FC<{ appBarRef: React.MutableRefObject<null> }> = ({
  appBarRef,
}) => {
  const { t } = useTranslation();

  const searchBarRef = useRef(null);

  const [classes, setClasses] = useState<string>('searchbar-relative');
  const [scrollPos, setScrollPos] = useState<number>(0);

  const isInViewport = (element: any) => {
    const bounding = element.getBoundingClientRect();
    return bounding.bottom >= 0;
  };

  const onScroll = useCallback(() => {
    const scrollUp = scrollPos > window.pageYOffset;
    setScrollPos(window.pageYOffset);

    if (
      !appBarRef ||
      !searchBarRef ||
      isInViewport(appBarRef.current) ||
      (isInViewport(searchBarRef.current) && !scrollUp)
    ) {
      setClasses('searchbar-relative');
    } else if (classes === 'searchbar-relative') {
      setClasses('searchbar-fixed searchbar-hidden searchbar-transition');
    } else {
      setClasses(`searchbar-fixed ${!scrollUp ? 'searchbar-hidden' : ''}`);
    }
  }, [appBarRef, classes, scrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Box ref={searchBarRef}>
      <AppBar
        variant={'outlined'}
        elevation={0}
        color="secondary"
        sx={{
          borderTop: 'none',
        }}
        className={classes}
      >
        <Toolbar>
          <FilterButton title={t('post:price')}>
            <PriceFilter />
          </FilterButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
