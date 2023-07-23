import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const LogoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 299 295" {...props}>
      <path
        d="m146.996.71 146.536 109.746c5.501 4.12 6.621 11.919 2.501 17.42-4.12 5.501-11.919 6.621-17.42 2.501L147.27 32.01 20.772 130.245c-5.428 4.216-13.245 3.232-17.46-2.196-4.216-5.428-3.233-13.245 2.195-17.461L146.996.711Z"
        clipRule="evenodd"
      />
      <path
        d="M45.133 290.144V131.949L146.25 55.875l102.046 76.074v158.195a4.148 4.148 0 0 1-4.148 4.148H49.281a4.148 4.148 0 0 1-4.148-4.148Zm93.128-143.8c-17.683-14.756-51.012-10.03-51.012 26.792.185 14.287 12.28 48.778 59.176 72.448.422-.234.902-.497 1.435-.789 12.239-6.703 52.422-28.707 58.097-71.659 3.34-36.607-32.09-42.43-51.145-26.677l-.311.26a32.173 32.173 0 0 0-6.505 7.483c-.257.41-.506.828-.745 1.254-.344.613-1.275.599-1.602-.024a29.748 29.748 0 0 0-.71-1.276c-1.71-2.895-3.887-5.43-6.389-7.569a21.857 21.857 0 0 0-.289-.243Zm47.396-19.872c-13.194-2.326-28.069 1.392-39.054 10.616-10.248-8.738-24.213-12.498-36.971-10.425-9.222 1.498-18.197 6.084-24.787 14.329-6.58 8.233-10.04 19.169-10.04 32.144v.161c.253 19.487 15.502 57.902 66.013 83.396l5.886 2.971 5.763-3.201c.401-.223.869-.479 1.4-.769 5.876-3.212 19.334-10.568 32.304-22.459 14.188-13.008 28.652-32.198 32.123-58.469l.032-.249.023-.25c1.183-12.955-1.518-24.187-7.89-32.798-6.352-8.585-15.463-13.351-24.802-14.997Z"
        clipRule="evenodd"
      />{' '}
    </SvgIcon>
  );
};

export default LogoIcon;
