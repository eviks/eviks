import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const ThemeSwitch = styled(Switch)(({ theme }) => {
  return {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url("data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='iso-8859-1'?%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='20' height='20' viewBox='0 0 168.29 168.29' style='enable-background:new 0 0 168.29 168.29;' xml:space='preserve'%3E%3Cpath fill='${encodeURIComponent(
            theme.palette.primary.contrastText.toString(),
          )}' d='M159.81,127.909c-1.025-2.473-3.289-4.212-5.942-4.565c-24.423-3.241-45.44-19.364-54.848-42.078 c-9.409-22.715-5.95-48.978,9.028-68.539c1.628-2.125,1.999-4.957,0.975-7.43c-1.024-2.473-3.289-4.212-5.942-4.565 C99.416,0.247,95.69,0,92.005,0C80.957,0,70.152,2.155,59.889,6.406c-20.764,8.601-36.935,24.772-45.533,45.536 c-8.597,20.761-8.595,43.628,0.004,64.39c13.074,31.563,43.595,51.957,77.756,51.957c0.001,0,0.001,0,0.001,0 c11.051,0,21.872-2.161,32.164-6.424c13.644-5.652,25.592-14.825,34.553-26.528C160.462,133.213,160.834,130.382,159.81,127.909z M118.541,148.008c-8.463,3.505-17.353,5.283-26.424,5.282c-28.073,0-53.155-16.76-63.899-42.698 c-7.067-17.061-7.068-35.852-0.004-52.911C35.28,40.62,48.567,27.332,65.629,20.265c7.424-3.075,15.189-4.816,23.126-5.188 c-11.761,22.021-13.291,48.521-3.595,71.93c9.694,23.405,29.509,41.059,53.392,48.315 C132.687,140.647,125.916,144.953,118.541,148.008z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E")`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'light'
              ? theme.palette.grey[400]
              : theme.palette.grey[800],
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='utf-8'?%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512' xmlns:xlink='http://www.w3.org/1999/xlink' enable-background='new 0 0 512 512'%3E%3Cg%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z'/%3E%3Cpath fill='${encodeURIComponent(
          '#fff',
        )}' d='m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[800],
      borderRadius: 20 / 2,
    },
  };
});

export default ThemeSwitch;
