import * as React from 'react'

function SvgOven({ className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1.2em"
      height="1.2em"
      className={`svg-icon ${className || ''}`}
      {...props}
    >
      <circle fill="currentColor" cx="166" cy="135" r="15" />
      <circle fill="currentColor" cx="346" cy="135" r="15" />
      <path
        fill="currentColor"
        d="M436,60h-15V30h15c8.284,0,15-6.716,15-15s-6.716-15-15-15H286c-8.284,0-15,6.716-15,15s6.716,15,15,15h15v30h-90V30h15
			c8.284,0,15-6.716,15-15s-6.716-15-15-15H76c-8.284,0-15,6.716-15,15s6.716,15,15,15h15v30H76c-24.813,0-45,20.187-45,45
			c0,30.006,0,344.792,0,362c0,24.813,20.187,45,45,45h360c24.813,0,45-20.187,45-45c0-39.529,0-300.03,0-362
			C481,80.187,460.813,60,436,60z M331,30h60v30h-60V30z M121,30h60v30h-60V30z M451,467c0,8.271-6.729,15-15,15H76
			c-8.271,0-15-6.729-15-15V210h390V467z M451,180H61c0-7.424,0-66.539,0-75c0-8.271,6.729-15,15-15h360c8.271,0,15,6.729,15,15
			C451,113.45,451,172.527,451,180z"
      />
      <path
        fill="currentColor"
        d="M406,241c-8.284,0-15,6.716-15,15v15H121v-15c0-8.284-6.716-15-15-15s-15,6.716-15,15v30c0,8.284,6.716,15,15,15h300
			c8.284,0,15-6.716,15-15v-30C421,247.716,414.284,241,406,241z"
      />
      <path
        fill="currentColor"
        d="M286,120h-60c-8.284,0-15,6.716-15,15s6.716,15,15,15h60c8.284,0,15-6.716,15-15S294.284,120,286,120z"
      />
      <path
        fill="currentColor"
        d="M406,331H106c-8.284,0-15,6.716-15,15v91c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15v-91
			C421,337.716,414.284,331,406,331z M391,422H121v-61h270V422z"
      />
    </svg>
  )
}

export default SvgOven
