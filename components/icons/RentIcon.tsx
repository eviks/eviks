import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RentIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <path d="M489.735 111.302c-9.22 0-16.695 7.475-16.695 16.695v16.695H358.302c-27.14 0-53.406 11.304-72.064 31.014l-95.075 100.441c-28.453 30.059-23.396 78.447 10.849 102.018-2.296.174-4.608.26-6.933.26H72.714c-37.023 0-67.144 30.121-67.144 67.144.001 36.706 29.067 65.88 66.172 66.417l.242.001 166.041.01c53.592 0 102.508-19.44 137.942-54.874l72.569-72.568 24.666-20.627c1.08 8.178 8.06 14.496 16.534 14.496 9.22 0 16.695-7.475 16.695-16.695V127.994c-.001-9.217-7.476-16.692-16.696-16.692zm-16.696 209.237-46.494 38.881c-.38.317-.745.652-1.095 1.002l-73.093 73.093c-27.762 27.763-66.873 45.084-116.41 45.084H72.117c-18.601-.325-33.157-14.812-33.157-33.028.001-18.612 15.143-33.753 33.753-33.753h122.363c32.98 0 63.985-12.843 87.305-36.163l60.551-60.551c6.52-6.519 6.521-17.09 0-23.611-6.519-6.52-17.09-6.52-23.611 0l-55.1 55.1c-6.432 6.432-14.984 9.974-24.08 9.974-29.323 0-45.642-35.374-24.731-57.464l95.075-100.441c12.38-13.078 29.809-20.579 47.815-20.579h114.737v142.456z" />
      <path d="M105.743 0C50.508 0 5.571 44.937 5.571 100.172c0 36.063 19.335 69.021 50.086 86.773v96.875c0 4.428 1.759 8.674 4.89 11.805l33.391 33.391c6.519 6.52 17.09 6.521 23.61 0l33.391-33.391a16.695 16.695 0 0 0 4.891-11.805v-96.875c30.751-17.753 50.086-50.71 50.086-86.773C205.915 44.937 160.977 0 105.743 0zm26.707 161.404a16.698 16.698 0 0 0-10.012 15.298v100.202L105.743 293.6l-16.695-16.695V176.702c0-6.636-3.93-12.642-10.012-15.298-24.345-10.636-40.074-34.672-40.074-61.232 0-36.823 29.958-66.781 66.781-66.781 36.823 0 66.781 29.958 66.781 66.781 0 26.56-15.73 50.596-40.074 61.232z" />
      <circle cx={105.737} cy={83.477} r={16.695} />
    </SvgIcon>
  );
};

export default RentIcon;
