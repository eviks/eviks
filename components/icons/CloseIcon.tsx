import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 241.171 241.171" {...props}>
      <path d="m138.138 120.754 99.118-98.576a11.931 11.931 0 0 0 0-17.011c-4.74-4.704-12.439-4.704-17.179 0l-99.033 98.492-99.949-99.96c-4.74-4.752-12.439-4.752-17.179 0-4.74 4.764-4.74 12.475 0 17.227l99.876 99.888L3.555 220.497c-4.74 4.704-4.74 12.319 0 17.011 4.74 4.704 12.439 4.704 17.179 0l100.152-99.599 99.551 99.563c4.74 4.752 12.439 4.752 17.179 0 4.74-4.764 4.74-12.475 0-17.227l-99.478-99.491z" />
    </SvgIcon>
  );
};

export default CloseIcon;