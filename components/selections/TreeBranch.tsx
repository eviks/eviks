import React, { FC, useEffect, useState, useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { removeAzerbaijaniChars, getSettlementPresentation } from '../../utils';
import { Settlement } from '../../types';

interface TreeBranchState {
  district: Settlement;
  selectedDistricts: Settlement[];
  selectedSubdistricts: Settlement[];
  searchString: string;
  multiple: boolean;
  updateSelectedSettlements: (
    district: Settlement,
    parentValue: boolean | null,
    childrenValue: boolean[],
  ) => void;
  onSingleSelect?: (
    district: Settlement,
    subdistrict: Settlement | undefined,
  ) => void;
}

const TreeBranch: FC<TreeBranchState> = ({
  district,
  selectedDistricts,
  selectedSubdistricts,
  searchString,
  multiple,
  updateSelectedSettlements,
  onSingleSelect,
}) => {
  const [parentValue, setParentValue] = useState<boolean | null>(null);
  const [childrenValue, setChildrenValue] = useState<boolean[]>([]);

  const [parentMatches, setParentMatches] = useState<boolean | null>(null);
  const [childrenMatch, setChildrenMatch] = useState<boolean | null>(null);

  const searchStringMatch = useCallback(
    (value: string) => {
      return RegExp(removeAzerbaijaniChars(searchString), 'i').test(
        removeAzerbaijaniChars(value),
      );
    },
    [searchString],
  );

  useEffect(() => {
    const settlementIsSelected = (
      array: Settlement[],
      settlement: Settlement,
    ): boolean => {
      return (
        array.find((element) => {
          return element.id === settlement.id;
        }) !== undefined
      );
    };

    const children = district.children ?? [];

    if (settlementIsSelected(selectedDistricts, district)) {
      setParentValue(true);
      setChildrenValue(
        children.map((_subdistrict) => {
          return true;
        }),
      );
    } else {
      const newChildrenValue = children.map((subdistrict) => {
        return settlementIsSelected(selectedSubdistricts, subdistrict);
      });
      setChildrenValue(newChildrenValue);

      setParentValue(
        newChildrenValue.find((element) => {
          return element === true;
        }) !== undefined,
      );
    }
  }, [district, selectedDistricts, selectedSubdistricts]);

  useEffect(() => {
    setParentMatches(searchStringMatch(getSettlementPresentation(district)));

    setChildrenMatch((_prevState) => {
      return (
        district.children?.find((child) => {
          return searchStringMatch(getSettlementPresentation(child));
        }) !== undefined
      );
    });
  }, [district, searchString, searchStringMatch]);

  const manageTristate = (index: number) => {
    const value = !childrenValue[index];

    const newChildrenValue = childrenValue.map((element, i) => {
      if (i === index) return !element;
      return element;
    });

    setChildrenValue(newChildrenValue);

    if (value) {
      if (newChildrenValue.includes(false)) {
        // Some elements are still unselected
        setParentValue(null);
      } else {
        // All elements are selected
        setParentValue(true);
      }
    } else if (newChildrenValue.includes(true)) {
      // Some elements are still selected
      setParentValue(null);
    } else {
      // All elements are unselected
      setParentValue(false);
    }
  };

  const handleSubdistrictClick = (index?: number) => {
    if (!multiple && onSingleSelect) {
      const subdistrict = district.children
        ? district.children[index ?? 0] ?? undefined
        : undefined;
      onSingleSelect(district, subdistrict);
    } else {
      manageTristate(index ?? 0);
      updateSelectedSettlements(district, parentValue, childrenValue);
    }
  };

  const hanleDistrictClick = () => {
    if (!multiple && onSingleSelect) {
      onSingleSelect(
        district,
        district.children?.length === 1 ? district.children[0] : undefined,
      );
    } else {
      // Select / unselect all
      setParentValue((prevState) => {
        return !prevState;
      });
      setChildrenValue((prevState) => {
        return prevState.map(() => {
          return !parentValue;
        });
      });
    }
  };

  return (
    <List
      sx={{
        display: parentMatches || childrenMatch ? 'auto' : 'none',
      }}
    >
      <ListItemButton
        role={undefined}
        dense
        onClick={(_event) => {
          return hanleDistrictClick();
        }}
      >
        {multiple && <Checkbox checked={parentValue ?? false} disableRipple />}
        <ListItemText
          primary={
            <Typography fontWeight={'bold'}>
              {getSettlementPresentation(district)}
            </Typography>
          }
        />
      </ListItemButton>
      {childrenValue.length === 0 ? null : (
        <Box sx={{ ml: 2 }}>
          {district.children?.map((child, index) => {
            return (
              <ListItemButton
                key={child.id}
                role={undefined}
                dense
                onClick={(_event) => {
                  return handleSubdistrictClick(index);
                }}
                sx={{
                  display:
                    searchStringMatch(getSettlementPresentation(child)) ||
                    parentMatches
                      ? 'auto'
                      : 'none',
                }}
              >
                {multiple && (
                  <Checkbox checked={childrenValue[index]} disableRipple />
                )}
                <ListItemText primary={getSettlementPresentation(child)} />
              </ListItemButton>
            );
          })}
        </Box>
      )}
    </List>
  );
};
export default TreeBranch;
