import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const InternetIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M399.28 277.601a21.608 21.608 0 0 0-7.191-15.454c-37.419-33.312-85.748-51.658-136.088-51.658-50.34 0-98.669 18.346-136.088 51.658-4.398 3.916-7.019 9.548-7.19 15.451a21.756 21.756 0 0 0 6.339 15.957l41.123 41.123c8.001 7.999 20.553 8.545 29.2 1.267 18.55-15.62 42.209-24.221 66.616-24.22 24.409 0 48.067 8.603 66.617 24.22 4.067 3.426 8.997 5.119 13.914 5.119 5.534-.001 11.049-2.147 15.287-6.384l41.122-41.123a21.765 21.765 0 0 0 6.339-15.956zm-62.724 41.797-.004-.002c-22.445-18.898-51.052-29.305-80.551-29.305-29.498 0-58.107 10.409-80.519 29.29l-41.183-41.075c33.453-29.78 76.674-46.181 121.703-46.181s88.25 16.401 121.642 46.133l-41.088 41.14zM288.191 383.008c-8.598-8.598-20.03-13.334-32.189-13.334s-23.592 4.736-32.19 13.333c-17.748 17.751-17.748 46.63.001 64.379 8.874 8.874 20.533 13.311 32.189 13.311s23.314-4.436 32.188-13.311c8.598-8.597 13.334-20.03 13.334-32.189 0-12.16-4.736-23.592-13.333-32.189zm-15.299 49.082c-9.312 9.314-24.468 9.314-33.782 0-9.315-9.315-9.315-24.47 0-33.784a23.728 23.728 0 0 1 16.892-6.997 23.732 23.732 0 0 1 16.892 6.998 23.732 23.732 0 0 1 6.996 16.892c0 6.38-2.485 12.38-6.998 16.891z"
      />
      <path
        fill="currentColor"
        d="M505.147 149.718C365.44 18.499 146.563 18.498 6.854 149.717c-4.326 4.062-6.758 9.561-6.852 15.486-.092 5.902 2.156 11.451 6.328 15.623l41.041 41.041c8.26 8.26 21.425 8.519 29.971.592 48.605-45.098 112.053-69.935 178.659-69.935 66.604 0 130.053 24.837 178.658 69.935a21.49 21.49 0 0 0 14.668 5.781c5.534 0 11.065-2.133 15.304-6.372l41.041-41.041c4.173-4.172 6.42-9.721 6.328-15.623-.095-5.924-2.527-11.424-6.853-15.486zm-55.772 56.883c-52.619-48.824-121.293-75.711-193.373-75.711-72.081 0-140.755 26.888-193.332 75.679l-41.005-41.082c131.406-123.42 337.27-123.416 468.673.001l.036.041-40.999 41.072z"
      />
    </SvgIcon>
  );
};

export default InternetIcon;
