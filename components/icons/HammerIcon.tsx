import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const HammerIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <path d="M356.174 0H189.218c-9.22 0-16.696 7.475-16.696 16.696 0 9.206-7.49 16.696-16.696 16.696-9.206 0-16.696-7.49-16.696-16.696C139.13 7.475 131.655 0 122.435 0H55.652c-9.22 0-16.696 7.475-16.696 16.696v133.565c0 9.22 7.475 16.696 16.696 16.696h66.783c9.22 0 16.696-7.475 16.696-16.696 0-9.206 7.49-16.696 16.696-16.696 9.206 0 16.696 7.49 16.696 16.696 0 9.22 7.475 16.696 16.696 16.696h16.696v126.619L179.229 453.68c-5.09 30.541 18.487 58.32 49.406 58.32h54.732c30.964 0 54.488-27.823 49.406-58.32l-26.685-160.105V166.957h16.696c9.22 0 16.696-7.475 16.696-16.696v-22.619c35.103-14.273 75.291-12.895 109.403 4.161 11.119 5.56 24.162-2.574 24.162-14.933C473.043 52.277 420.775 0 356.174 0zM105.739 133.565H72.348V33.391h33.391v100.174zm66.783-30.519a49.86 49.86 0 0 0-16.696-2.872 49.838 49.838 0 0 0-16.696 2.872V63.911a49.86 49.86 0 0 0 16.696 2.872c5.852 0 11.47-1.018 16.696-2.872v39.135zm110.843 375.563h-54.732c-10.331 0-18.169-9.234-16.469-19.44l13.457-80.734h60.757l13.456 80.734c1.698 10.189-6.122 19.44-16.469 19.44zm-8.117-166.957 5.565 33.391h-49.626l5.565-33.391h38.496zm-35.944-33.391V166.957h33.391v111.304h-33.391zm66.783-144.696H205.913V33.391h100.174v100.174zm33.391-41.392V33.391h16.696c37.604 0 68.696 24.674 79.396 57.554-31.359-8.982-64.933-8.574-96.092 1.228z" />
    </SvgIcon>
  );
};

export default HammerIcon;