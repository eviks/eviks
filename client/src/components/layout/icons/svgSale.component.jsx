import * as React from 'react'

function SvgSale({ className = '', ...props }) {
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
        d="M507.111,255.326l-50.763-50.763V94.609c0-9.22-7.475-16.696-16.696-16.696H372.87c-9.22,0-16.696,7.475-16.696,16.696
			v9.78L267.805,16.02c-6.519-6.519-17.091-6.519-23.611,0C238.116,22.099,13.778,246.436,4.89,255.325
			c-6.52,6.519-6.52,17.091,0,23.611c6.519,6.519,17.091,6.519,23.611,0l27.152-27.15v232.389c0,9.22,7.475,16.696,16.696,16.696
			h367.304c9.22,0,16.696-7.475,16.696-16.696V251.785l27.152,27.152c6.52,6.52,17.091,6.52,23.611,0
			C513.631,272.418,513.631,261.846,507.111,255.326z M422.957,467.479H89.044V218.394L256.001,51.437
			c8.681,8.681,158.347,158.347,166.957,166.957V467.479z M422.957,171.172l-33.391-33.391v-26.476h33.391V171.172z"
      />
      <circle fill="currentColor" cx="205.914" cy="261.566" r="16.696" />
      <path
        fill="currentColor"
        d="M373.545,355.5l-16.696-16.697c-3.131-3.131-7.377-4.89-11.805-4.89h-22.261v-22.261c0-4.429-1.759-8.675-4.891-11.805
			l-29.065-29.066c0.377-3.129,0.564-6.185,0.564-9.215c0-46.03-37.448-83.478-83.478-83.478s-83.478,37.448-83.478,83.478
			s37.448,83.478,83.478,83.478c3.031,0,6.088-0.186,9.216-0.564l84.717,84.717c3.131,3.131,7.378,4.89,11.806,4.89h50.087
			c9.22,0,16.696-7.475,16.696-16.696v-50.087C378.435,362.876,376.676,358.63,373.545,355.5z M345.044,400.696h-26.476
			l-85.956-85.956c-4.063-4.061-9.926-5.749-15.527-4.471c-4.067,0.93-7.721,1.383-11.172,1.383
			c-27.618,0-50.087-22.469-50.087-50.087c0-27.618,22.469-50.087,50.087-50.087c27.618,0,50.087,22.469,50.087,50.087
			c0,3.45-0.452,7.106-1.382,11.173c-1.28,5.6,0.408,11.464,4.471,15.526l30.303,30.304v32.041c0,9.22,7.475,16.696,16.696,16.696
			h32.041l6.915,6.915V400.696z"
      />
    </svg>
  )
}

export default SvgSale
