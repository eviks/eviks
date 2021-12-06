import * as React from 'react';

function SvgDishwasher({ className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1.2em"
      height="1.2em"
      className={`svg-icon ${className || ''}`}
      {...props}
    >
      <path
        fill="currentColor"
        d="m467 0h-422c-24.8125 0-45 20.1875-45 45v422c0 24.8125 20.1875 45 45 45h422c24.8125 0 45-20.1875 45-45v-422c0-24.8125-20.1875-45-45-45zm-422 30h422c8.269531 0 15 6.730469 15 15v75h-452v-75c0-8.269531 6.730469-15 15-15zm422 452h-422c-8.269531 0-15-6.730469-15-15v-317h452v317c0 8.269531-6.730469 15-15 15zm0 0"
      />
      <path
        fill="currentColor"
        d="m256 90h180c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-180c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"
      />
      <path
        fill="currentColor"
        d="m90.972656 75c0 8.285156-6.71875 15-15 15-8.285156 0-15-6.714844-15-15s6.714844-15 15-15c8.28125 0 15 6.714844 15 15zm0 0"
      />
      <path
        fill="currentColor"
        d="m150.972656 75c0 8.285156-6.71875 15-15 15-8.285156 0-15-6.714844-15-15s6.714844-15 15-15c8.28125 0 15 6.714844 15 15zm0 0"
      />
      <path
        fill="currentColor"
        d="m210.972656 75c0 8.285156-6.71875 15-15 15-8.285156 0-15-6.714844-15-15s6.714844-15 15-15c8.28125 0 15 6.714844 15 15zm0 0"
      />
      <path
        fill="currentColor"
        d="m451 195c0-8.285156-6.714844-15-15-15h-360c-8.285156 0-15 6.714844-15 15v242c0 8.285156 6.714844 15 15 15h360c8.285156 0 15-6.714844 15-15 0-11.886719 0-232.515625 0-242zm-30 15v80.8125c-17.347656-12.085938-38.1875-18.8125-60-18.8125-21.609375 0-42.496094 6.644531-60.019531 18.867188-17.015625-11.882813-37.695313-18.867188-59.980469-18.867188-21.609375 0-42.496094 6.644531-60.019531 18.867188-17.015625-11.882813-37.695313-18.867188-59.980469-18.867188-10.203125 0-20.3125 1.492188-30 4.375v-66.375zm-205.140625 212c6.617187-13.945312 10.140625-29.28125 10.140625-45 0-5.09375-.371094-10.101562-1.074219-15.003906 16.941407-.597656 31.074219 13 31.074219 30.003906 0 8.285156 6.714844 15 15 15s15-6.714844 15-15c0-36.550781-32.597656-65.191406-69.78125-59.222656-3.453125-7.40625-7.742188-14.347656-12.75-20.699219 11.324219-6.550781 24.234375-10.078125 37.53125-10.078125 41.355469 0 75 33.644531 75 75 0 16.320312-5.292969 32.066406-15.007812 45zm-124.859375-56.445312c23.183594-10.789063 45 5.121093 45 26.445312 0 8.285156 6.714844 15 15 15s15-6.714844 15-15c0-38.089844-35.40625-67.808594-75-58.097656v-25.648438c9.40625-4.101562 19.632812-6.253906 30-6.253906 41.355469 0 75 33.644531 75 75 0 16.320312-5.292969 32.066406-15.007812 45h-89.992188zm244.859375 56.445312c6.617187-13.945312 10.140625-29.28125 10.140625-45 0-5.09375-.371094-10.101562-1.074219-15.003906 16.941407-.597656 31.074219 13.003906 31.074219 30.003906 0 8.285156 6.714844 15 15 15s15-6.714844 15-15c0-36.519531-32.570312-65.195312-69.78125-59.222656-3.453125-7.40625-7.742188-14.347656-12.75-20.699219 11.324219-6.550781 24.234375-10.078125 37.53125-10.078125 23.726562 0 45.84375 11.136719 60 29.996094v90.003906zm0 0"
      />
    </svg>
  );
}

export default SvgDishwasher;
