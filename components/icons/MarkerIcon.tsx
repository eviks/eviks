import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const MarkerIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <path d="M256 100.174c-46.03 0-83.478 37.448-83.478 83.478S209.97 267.131 256 267.131s83.478-37.448 83.478-83.478S302.03 100.174 256 100.174zm0 133.566c-27.618 0-50.087-22.469-50.087-50.087 0-27.618 22.469-50.087 50.087-50.087 27.618 0 50.087 22.469 50.087 50.087 0 27.618-22.469 50.087-50.087 50.087z" />
      <path d="M256 0C154.734 0 72.347 82.387 72.347 183.653c0 70.835 21.232 98.615 169.771 320.928 6.603 9.882 21.148 9.903 27.764 0 149.325-223.389 169.771-250.792 169.771-320.928C439.652 82.387 357.266 0 256 0zm.001 465.261C122.631 265.788 105.74 241.56 105.74 183.653 105.739 100.799 173.146 33.391 256 33.391s150.261 67.407 150.261 150.261c0 55.899-12.851 76.029-150.26 281.609z" />
    </SvgIcon>
  );
};

export default MarkerIcon;
