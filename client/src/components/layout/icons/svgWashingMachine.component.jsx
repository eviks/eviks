import * as React from 'react';

function SvgWashingMachine({ className = '', ...props }) {
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
        d="M376,120h-15V75c0-8.284-6.716-15-15-15h-45V15c0-8.284-6.716-15-15-15h-90c-24.813,0-45,20.187-45,45
			c0,11.517,4.354,22.032,11.495,30C155.354,82.968,151,93.483,151,105c0,5.258,0.915,10.305,2.58,15H136c-24.813,0-45,20.187-45,45
			v302c0,24.813,20.187,45,45,45h240c24.813,0,45-20.187,45-45V165C421,140.187,400.813,120,376,120z M196,30h75v30h-75
			c-8.271,0-15-6.729-15-15S187.729,30,196,30z M196,90h135v30H196c-8.271,0-15-6.729-15-15S187.729,90,196,90z M121,165
			c0-8.271,6.729-15,15-15h165v30H121V165z M391,467c0,8.271-6.729,15-15,15H136c-8.271,0-15-6.729-15-15V210h270V467z M391,180h-60
			v-30h45c8.271,0,15,6.729,15,15V180z"
      />
      <path
        fill="currentColor"
        d="M256,242c-57.897,0-105,47.103-105,105c0,57.897,47.103,105,105,105c57.897,0,105-47.103,105-105
			C361,289.103,313.897,242,256,242z M256,272c29.008,0,54.205,16.565,66.675,40.723c-15.649,0.733-30.812,7.201-42.413,18.802
			c-6.481,6.481-15.097,10.05-24.262,10.05s-17.781-3.569-24.262-10.05c-11.6-11.6-26.764-18.069-42.413-18.801
			C201.795,288.566,226.991,272,256,272z M256,422c-41.355,0-75-33.645-75-75c0-1.314,0.036-2.62,0.103-3.918
			c10.63-1.637,21.559,1.793,29.422,9.656c12.147,12.147,28.297,18.836,45.475,18.836c17.178,0,33.328-6.689,45.475-18.836
			c7.863-7.863,18.792-11.293,29.423-9.656C330.964,344.38,331,345.686,331,347C331,388.355,297.355,422,256,422z"
      />
    </svg>
  );
}

export default SvgWashingMachine;
