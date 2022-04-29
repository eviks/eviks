import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const KitchenFurnitureIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <circle fill="currentColor" cx={166} cy={135} r={15} />
      <circle fill="currentColor" cx={346} cy={135} r={15} />
      <path
        fill="currentColor"
        d="M436 60h-15V30h15c8.284 0 15-6.716 15-15s-6.716-15-15-15H286c-8.284 0-15 6.716-15 15s6.716 15 15 15h15v30h-90V30h15c8.284 0 15-6.716 15-15s-6.716-15-15-15H76c-8.284 0-15 6.716-15 15s6.716 15 15 15h15v30H76c-24.813 0-45 20.187-45 45v362c0 24.813 20.187 45 45 45h360c24.813 0 45-20.187 45-45V105c0-24.813-20.187-45-45-45zM331 30h60v30h-60V30zm-210 0h60v30h-60V30zm330 437c0 8.271-6.729 15-15 15H76c-8.271 0-15-6.729-15-15V210h390v257zm0-287H61v-75c0-8.271 6.729-15 15-15h360c8.271 0 15 6.729 15 15v75z"
      />
      <path
        fill="currentColor"
        d="M406 241c-8.284 0-15 6.716-15 15v15H121v-15c0-8.284-6.716-15-15-15s-15 6.716-15 15v30c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15zM286 120h-60c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15s-6.716-15-15-15zM406 331H106c-8.284 0-15 6.716-15 15v91c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15v-91c0-8.284-6.716-15-15-15zm-15 91H121v-61h270v61z"
      />
    </SvgIcon>
  );
};

export default KitchenFurnitureIcon;
