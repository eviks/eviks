import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

interface FilterButtonProps {
  title: string;
}

const FilterButton: FC<FilterButtonProps> = ({ title, children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ mr: 2 }}>
      <Button variant="outlined" onClick={handleClick}>
        {title}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{ sx: { borderRadius: '20px' } }}
        sx={{
          mt: 1,
        }}
      >
        <Box sx={{ p: { xs: 1.5, md: 3 } }}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, {
                handleClose,
              });
            }
            return child;
          })}
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterButton;
