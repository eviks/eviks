import React, { Fragment, useRef, useEffect } from 'react';
import DropdownItem from './dropdownItem.component';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import '../postForm.style.scss';

const useClickOutside = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick([]);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

const FadeInAnimation = keyframes`{
   0% {
      opacity: 0;
      transform: translateY(-20px);
   }
   100% {
      opacity: 1;
      transform: translateY(0);
   }
}`;

const FadeInUl = styled.ul`
  animation: 0.5s ${FadeInAnimation};
`;

const AddressDropdown = ({ list, setDropdownList }) => {
  const ref = useRef(null);
  useClickOutside(ref, setDropdownList);

  return (
    <Fragment>
      {list.length > 0 && (
        <FadeInUl ref={ref} className="dropdown-address">
          {list.map((listItem, index) => (
            <DropdownItem key={index} listItem={listItem} />
          ))}
        </FadeInUl>
      )}
    </Fragment>
  );
};

AddressDropdown.propTypes = {
  list: PropTypes.array.isRequired,
  setDropdownList: PropTypes.func.isRequired,
};

export default AddressDropdown;
