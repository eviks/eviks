import * as React from 'react';

function SvgStairs({ className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1.2em"
      height="1.2em"
      className={`svg-icon ${className || ''}`}
      {...props}
    >
      <circle fill="currentColor" cx="428.522" cy="294.956" r="16.696" />
      <circle fill="currentColor" cx="428.522" cy="361.739" r="16.696" />
      <path
        fill="currentColor"
        d="M473.043,0H38.957C17.476,0,0,17.476,0,38.957v434.087C0,494.524,17.476,512,38.957,512c11.56,0,422.259,0,434.087,0
			C494.524,512,512,494.524,512,473.043V38.957C512,17.476,494.524,0,473.043,0z M205.913,478.609H100.174v-244.87h105.739V478.609z
			 M345.043,478.609H239.304v-244.87h105.739V478.609z M478.609,473.043c0,3.069-2.497,5.565-5.565,5.565h-94.609V217.043
			c0-9.22-7.475-16.696-16.696-16.696H83.478c-9.22,0-16.696,7.475-16.696,16.696v261.565H38.957c-3.069,0-5.565-2.497-5.565-5.565
			V38.957c0-3.069,2.497-5.565,5.565-5.565h434.087c3.069,0,5.565,2.497,5.565,5.565V473.043z"
      />
      <path
        fill="currentColor"
        d="M361.739,66.783H83.478c-9.22,0-16.696,7.475-16.696,16.696v66.783c0,9.22,7.475,16.696,16.696,16.696h278.261
			c9.22,0,16.696-7.475,16.696-16.696V83.478C378.435,74.258,370.96,66.783,361.739,66.783z M345.043,133.565h-244.87v-33.391
			h244.87V133.565z"
      />
    </svg>
  );
}

export default SvgStairs;
