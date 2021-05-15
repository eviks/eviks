import * as React from 'react'

function SvgTelephone({ className = '', ...props }) {
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
        d="M467,106H240V91c0-41.355-33.645-75-75-75c-36.991,0-67.792,26.926-73.885,62.202C77.828,82.524,67.238,92.867,62.58,106
			H45c-24.813,0-45,20.187-45,45v300c0,24.813,20.187,45,45,45h422c24.813,0,45-20.187,45-45V151C512,126.187,491.813,106,467,106z
			 M165,46c24.813,0,45,20.187,45,45v15h-32.58c-6.192-17.458-22.865-30-42.42-30h-12.42C128.772,58.542,145.445,46,165,46z M90,121
			c0-8.271,6.729-15,15-15h30c8.271,0,15,6.729,15,15v270c0,8.271-6.729,15-15,15h-30c-8.271,0-15-6.729-15-15V121z M482,451
			c0,8.271-6.729,15-15,15H45c-8.271,0-15-6.729-15-15V151c0-8.271,6.729-15,15-15h15v255c0,24.813,20.187,45,45,45h30
			c24.813,0,45-20.187,45-45V136h287c8.271,0,15,6.729,15,15V451z"
      />
      <path
        fill="currentColor"
        d="M437,166H225c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15h212c8.284,0,15-6.716,15-15v-60
			C452,172.716,445.284,166,437,166z M422,226H240v-30h182V226z"
      />
      <path
        fill="currentColor"
        d="M255,286h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S263.284,286,255,286z"
      />
      <path
        fill="currentColor"
        d="M346,286h-31c-8.284,0-15,6.716-15,15s6.716,15,15,15h31c8.284,0,15-6.716,15-15S354.284,286,346,286z"
      />
      <path
        fill="currentColor"
        d="M437,286h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S445.284,286,437,286z"
      />
      <path
        fill="currentColor"
        d="M255,346h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S263.284,346,255,346z"
      />
      <path
        fill="currentColor"
        d="M346,346h-31c-8.284,0-15,6.716-15,15s6.716,15,15,15h31c8.284,0,15-6.716,15-15S354.284,346,346,346z"
      />
      <path
        fill="currentColor"
        d="M437,346h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S445.284,346,437,346z"
      />
      <path
        fill="currentColor"
        d="M255,406h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S263.284,406,255,406z"
      />
      <path
        fill="currentColor"
        d="M346,406h-31c-8.284,0-15,6.716-15,15s6.716,15,15,15h31c8.284,0,15-6.716,15-15S354.284,406,346,406z"
      />
      <path
        fill="currentColor"
        d="M437,406h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S445.284,406,437,406z"
      />
    </svg>
  )
}

export default SvgTelephone
