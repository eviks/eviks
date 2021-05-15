import * as React from 'react'

function SvgHouse({ className = '', ...props }) {
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
        d="M507.11,255.325l-50.763-50.763V94.609c0-9.22-7.475-16.696-16.696-16.696h-66.783c-9.22,0-16.696,7.475-16.696,16.696
			v9.78L267.805,16.02c-6.519-6.519-17.091-6.519-23.611,0C238.017,22.196,13.781,246.432,4.889,255.324
			c-6.519,6.52-6.519,17.092,0,23.611c6.52,6.519,17.091,6.519,23.611,0l27.152-27.15v232.389c0,9.22,7.475,16.696,16.696,16.696
			c8.565,0,366.477,0,367.304,0c9.22,0,16.696-7.475,16.696-16.696V251.785l27.152,27.152c6.52,6.52,17.091,6.52,23.611,0
			C513.63,272.417,513.63,261.846,507.11,255.325z M322.782,467.478H189.217V345.043c0-36.824,29.959-66.783,66.783-66.783
			s66.783,29.959,66.783,66.783V467.478z M422.956,467.478h-66.783V345.043c0-55.236-44.938-100.174-100.174-100.174
			s-100.174,44.938-100.174,100.174v122.435H89.043V218.394L256,51.437c8.681,8.681,158.348,158.348,166.957,166.957V467.478z
			 M422.956,171.172l-33.391-33.391v-26.476h33.391V171.172z"
      />
    </svg>
  )
}

export default SvgHouse
