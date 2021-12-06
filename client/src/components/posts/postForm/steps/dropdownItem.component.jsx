import React from 'react';
import { connect } from 'react-redux';
import { getAddressByCoords } from '../../../../actions/post';
import PropTypes from 'prop-types';

const DropdownItem = ({ listItem: { nm, addr, x, y }, getAddressByCoords }) => {
  return (
    <li
      className="dropdown-address-item"
      onClick={() => getAddressByCoords([x, y])}
    >
      <span>{nm}</span>
      <span className="small text-secondary">{addr}</span>
    </li>
  );
};

DropdownItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  getAddressByCoords: PropTypes.func.isRequired,
};

export default connect(null, { getAddressByCoords })(DropdownItem);
