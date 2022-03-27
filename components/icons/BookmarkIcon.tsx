import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const BookmarkIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <path d="M368 0H144C73.972 0 17 56.972 17 127c0 8.284 6.716 15 15 15h209v355a15 15 0 0 0 24.762 11.389L368 420.756l102.238 87.632a14.987 14.987 0 0 0 9.765 3.611A14.998 14.998 0 0 0 495 497V127C495 56.972 438.028 0 368 0zM48.158 112C55.388 65.609 95.613 30 144 30s88.612 35.609 95.842 82H48.158zM465 464.387l-87.238-74.775C374.953 387.204 371.477 386 368 386s-6.953 1.204-9.762 3.611L271 464.387V127c0-38.852-17.536-73.686-45.11-97H368c53.486 0 97 43.514 97 97v337.387z" />
    </SvgIcon>
  );
};

export default BookmarkIcon;
