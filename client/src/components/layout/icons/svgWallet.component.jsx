import * as React from 'react';

function SvgWallet({ className = '', ...props }) {
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
        d="m454.113 308.824h-11.422v-60.801c0-22.703-18.471-41.174-41.174-41.174h-13.8l40.247-76.23c4.191-7.938 5.037-17.032 2.379-25.606-2.661-8.584-8.512-15.617-16.477-19.804l-154.766-81.345c-16.413-8.628-36.806-2.317-45.458 14.066l-99.744 188.919h-24.848c-22.703 0-41.173 18.471-41.173 41.174v222.793c0 22.703 18.47 41.174 41.173 41.174h312.468c22.703 0 41.174-18.471 41.174-41.174v-60.801h11.422c5.523 0 10-4.478 10-10v-81.191c-.001-5.523-4.478-10-10.001-10zm-222.785-281.556c3.511-6.65 11.795-9.207 18.467-5.701l154.768 81.345c3.229 1.697 5.601 4.546 6.678 8.021 1.074 3.464.732 7.139-.962 10.348l-45.177 85.568h-26.843l25.516-48.328c1.24-2.349 1.495-5.093.708-7.63-.786-2.536-2.549-4.655-4.899-5.891-6.551-3.443-11.364-9.225-13.55-16.279-2.181-7.037-1.487-14.502 1.954-21.02 1.24-2.349 1.495-5.093.708-7.63-.786-2.536-2.549-4.655-4.899-5.891l-52.483-27.584c-4.881-2.565-10.92-.696-13.496 4.183-7.12 13.486-23.916 18.674-37.439 11.568-4.881-2.565-10.92-.695-13.496 4.183l-63.525 120.318h-26.844zm95.602 107.374c2.762 8.912 7.953 16.646 14.969 22.476l-26.256 49.731h-129.669l54.425-103.082c18.012 5.047 37.519-.981 49.512-15.313l36.642 19.259c-2.476 8.75-2.379 18.037.377 26.929zm95.762 336.174c0 11.676-9.499 21.174-21.174 21.174h-312.468c-11.675 0-21.173-9.498-21.173-21.174v-222.793c0-11.676 9.498-21.174 21.173-21.174h312.468c11.675 0 21.174 9.498 21.174 21.174v60.801h-39.046c-27.898 0-50.596 22.697-50.596 50.596s22.697 50.596 50.596 50.596h39.046zm21.421-80.801h-60.468c-16.871 0-30.596-13.726-30.596-30.596s13.725-30.596 30.596-30.596h60.468z"
      />
    </svg>
  );
}

export default SvgWallet;
