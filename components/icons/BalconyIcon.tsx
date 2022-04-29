import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const BalconyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="-16 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M465 301h-75V150C390 67.29 322.71 0 240 0S90 67.29 90 150v151H15c-8.285 0-15 6.715-15 15v181c0 8.285 6.715 15 15 15h450c8.285 0 15-6.715 15-15V316c0-8.285-6.715-15-15-15zm-15 121h-60v-91h60zm-150 0v-91h60v91zm-90 0v-91h60v91zm-90 0v-91h60v91zm0-242h30v121h-30zm210 121V180h30v121zM255 91.898c25.848 6.676 45 30.196 45 58.102h-45zM225 150h-45c0-27.906 19.152-51.426 45-58.102zm75 30v121H180V180zm60-30h-30c0-44.516-32.488-81.582-75-88.742v-30.32C314.113 38.34 360 88.91 360 150zM225 30.937v30.32c-42.512 7.165-75 44.227-75 88.743h-30c0-61.09 45.887-111.66 105-119.063zM90 331v91H30v-91zm360 151H30v-30h420zm0 0"
      />{' '}
    </SvgIcon>
  );
};

export default BalconyIcon;
