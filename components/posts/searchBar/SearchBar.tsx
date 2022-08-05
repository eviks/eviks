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
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import DistrictsBar from './DistrictsBar';
import FilterButton from './FilterButton';
import PriceFilter from '../filters/PriceFilter';
import DealTypeFilter from '../filters/DealTypeFilter';
import EstateTypeFilter from '../filters/EstateTypeFilter';
import ApartmentTypeFilter from '../filters/ApartmentTypeFilter';
import SqmFilter from '../filters/SqmFilter';
import LotSqmFilter from '../filters/LotSqmFilter';
import RoomsFilter from '../filters/RoomsFilters';
import CityFilter from '../filters/CityFilter';
import DistrictFilter from '../filters/DistrictFilter';
import MetroFilter from '../filters/MetroFilter';
import FloorFilter from '../filters/FloorFilter';
import OtherFilters from '../filters/otherFilters/OtherFilters';
import { AppContext } from '../../../store/appContext';
import {
  getDealTypeFilterTitle,
  getEstateTypeFilterTitle,
  getApartmentTypeFilterTitle,
  getPriceFilterTitle,
  getSqmFilterTitle,
  getLotSqmFilterTitle,
  getRoomsFilterTitle,
  getFloorFilterTitle,
} from '../../../utils/filterTitles';
import { EstateType } from '../../../types';

const SearchBar: FC<{ appBarRef: React.MutableRefObject<null> }> = ({
  appBarRef,
}) => {
  const router = useRouter();
  const theme = useTheme();

  const boxRef = useRef(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [dealTypeTitle, setDealTypeTitle] = useState<string>('');
  const [estateTypeTitle, setEstateTypeTitle] = useState<string>('');
  const [apartmentTypeTitle, setApartmentTypeTitle] = useState<string>('');
  const [priceTitle, setPriceTitle] = useState<string>('');
  const [roomsTitle, setRoomsTitle] = useState<string>('');
  const [sqmTitle, setSqmTitle] = useState<string>('');
  const [lotSqmTitle, setLotSqmTitle] = useState<string>('');
  const [floorTitle, setFloorTitle] = useState<string>('');
  const [classes, setClasses] = useState<string>('searchbar-relative');
  const [scrollPos, setScrollPos] = useState<number>(0);

  const {
    state: {
      posts: { filters },
    },
  } = useContext(AppContext);

  // Deal type title
  const getDealTypeTitle = useCallback(async () => {
    const title = await getDealTypeFilterTitle(
      filters.dealType,
      router.locale ?? 'az',
    );
    setDealTypeTitle(title);
  }, [filters.dealType, router.locale]);

  useEffect(() => {
    getDealTypeTitle();
  }, [getDealTypeTitle]);

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

  // Apartment title
  const getApartmentTypeTitle = useCallback(async () => {
    const title = await getApartmentTypeFilterTitle(
      filters.apartmentType,
      router.locale ?? 'az',
    );
    setApartmentTypeTitle(title);
  }, [filters.apartmentType, router.locale]);

  useEffect(() => {
    getApartmentTypeTitle();
  }, [getApartmentTypeTitle]);

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

  // Lot Sqm title
  const getLotSqmTitle = useCallback(async () => {
    const title = await getLotSqmFilterTitle(
      filters.lotSqmMin,
      filters.lotSqmMax,
      router.locale ?? 'az',
    );
    setLotSqmTitle(title);
  }, [filters.lotSqmMax, filters.lotSqmMin, router.locale]);

  useEffect(() => {
    getLotSqmTitle();
  }, [getLotSqmTitle]);

  // Floor
  const getFloorTitle = useCallback(async () => {
    const title = await getFloorFilterTitle(
      filters.floorMin,
      filters.floorMax,
      router.locale ?? 'az',
    );
    setFloorTitle(title);
  }, [filters.floorMax, filters.floorMin, router.locale]);

  useEffect(() => {
    getFloorTitle();
  }, [getFloorTitle]);

  const isInViewport = (element: any) => {
    const bounding = element.getBoundingClientRect();
    return bounding.bottom >= 0;
  };

  const onScroll = useCallback(() => {
    const scrollUp = scrollPos > window.pageYOffset;
    setScrollPos(window.pageYOffset);

    if (
      !appBarRef ||
      !boxRef ||
      isInViewport(appBarRef.current) ||
      (isInViewport(boxRef.current) && !scrollUp)
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

  const wheel = (event: WheelEvent) => {
    event.preventDefault();
    if (searchBarRef.current) {
      searchBarRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.addEventListener('wheel', wheel);
    }

    return () => {
      window.removeEventListener('wheel', wheel);
    };
  }, []);

  return (
    <Box ref={boxRef} sx={{ height: '50px' }}>
      <AppBar
        ref={searchBarRef}
        variant={'outlined'}
        elevation={0}
        color="transparent"
        sx={{
          borderTop: 'none',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default,
        }}
        className={`${classes} custom-scrollbar-${theme.palette.mode}`}
      >
        <Toolbar
          sx={{
            gap: 2,
            width: 'max-content',
            // mx: { lg: 10 },
            mb: 1,
          }}
        >
          <CityFilter />
          <DistrictFilter />
          <MetroFilter />
          <Divider orientation="vertical" sx={{ height: '30px' }} />
          <FilterButton title={dealTypeTitle}>
            <DealTypeFilter />
          </FilterButton>
          <FilterButton title={estateTypeTitle}>
            <EstateTypeFilter />
          </FilterButton>
          {filters.estateType === EstateType.apartment && (
            <FilterButton title={apartmentTypeTitle}>
              <ApartmentTypeFilter />
            </FilterButton>
          )}
          <FilterButton title={priceTitle}>
            <PriceFilter />
          </FilterButton>
          <FilterButton title={roomsTitle}>
            <RoomsFilter />
          </FilterButton>
          <FilterButton title={sqmTitle}>
            <SqmFilter />
          </FilterButton>

          {filters.estateType === EstateType.house && (
            <FilterButton title={lotSqmTitle}>
              <LotSqmFilter />
            </FilterButton>
          )}

          <FilterButton title={floorTitle}>
            <FloorFilter />
          </FilterButton>
          <OtherFilters />
        </Toolbar>
        <DistrictsBar />
      </AppBar>
    </Box>
  );
};

export default SearchBar;
