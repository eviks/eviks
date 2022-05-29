import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import FilterButton from './FilterButton';
import PriceFilter from '../filters/PriceFilter';
import EstateTypeFilter from '../filters/EstateTypeFilter';
import SqmFilter from '../filters/SqmFilter';
import RoomsFilter from '../filters/RoomsFilters';
import { AppContext } from '../../../store/appContext';
import {
  getEstateTypeFilterTitle,
  getPriceFilterTitle,
  getSqmFilterTitle,
  getRoomsFilterTitle,
} from '../../../utils/filterTitles';

const SearchBar: FC<{ appBarRef: React.MutableRefObject<null> }> = ({
  appBarRef,
}) => {
  const router = useRouter();

  const searchBarRef = useRef(null);

  const [estateTypeTitle, setEstateTypeTitle] = useState<string>('');
  const [priceTitle, setPriceTitle] = useState<string>('');
  const [roomsTitle, setRoomsTitle] = useState<string>('');
  const [sqmTitle, setSqmTitle] = useState<string>('');
  const [classes, setClasses] = useState<string>('searchbar-relative');
  const [scrollPos, setScrollPos] = useState<number>(0);

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  // Estate type title
  const getEstateTypeTitle = useCallback(async () => {
    const title = await getEstateTypeFilterTitle(
      filters.estateType,
      router.locale ?? 'az',
    );
    setEstateTypeTitle(title);
  }, [filters.estateType, router.locale]);

  useEffect(() => {
    getEstateTypeTitle();
  }, [getEstateTypeTitle]);

  // Price title
  const getPriceTitle = useCallback(async () => {
    const title = await getPriceFilterTitle(
      filters.priceMin,
      filters.priceMax,
      router.locale ?? 'az',
    );
    setPriceTitle(title);
  }, [filters.priceMax, filters.priceMin, router.locale]);

  useEffect(() => {
    getPriceTitle();
  }, [getPriceTitle]);

  // Rooms title
  const getRoomsTitle = useCallback(async () => {
    const title = await getRoomsFilterTitle(
      filters.rooms,
      router.locale ?? 'az',
    );
    setRoomsTitle(title);
  }, [filters.rooms, router.locale]);

  useEffect(() => {
    getRoomsTitle();
  }, [getRoomsTitle]);

  // Sqm title
  const getSqmTitle = useCallback(async () => {
    const title = await getSqmFilterTitle(
      filters.sqmMin,
      filters.sqmMax,
      router.locale ?? 'az',
    );
    setSqmTitle(title);
  }, [filters.sqmMax, filters.sqmMin, router.locale]);

  useEffect(() => {
    getSqmTitle();
  }, [getSqmTitle]);

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
    <Box ref={searchBarRef} sx={{ height: '50px' }}>
      <AppBar
        variant={'outlined'}
        elevation={0}
        color="secondary"
        sx={{
          borderTop: 'none',
        }}
        className={classes}
      >
        <Toolbar sx={{ gap: 2 }}>
          <FilterButton title={estateTypeTitle}>
            <EstateTypeFilter />
          </FilterButton>
          <FilterButton title={priceTitle}>
            <PriceFilter />
          </FilterButton>
          <FilterButton title={roomsTitle}>
            <RoomsFilter />
          </FilterButton>
          <FilterButton title={sqmTitle}>
            <SqmFilter />
          </FilterButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
