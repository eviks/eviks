import React from 'react'
import Input from '../../../layout/form/input/input.component'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import PropTypes from 'prop-types'

const PostEstateInfo = ({ formData, onChange }) => {
  const {
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    floor,
    totalFloors,
    ceilingHeight,
    yearBulid
  } = formData

  const maintenanceOptions = [
    {
      input: {
        id: 'redecorated',
        name: 'maintenance',
        type: 'radio',
        value: 'redecorated'
      },
      label: 'Redecorated'
    },
    {
      input: {
        id: 'designed',
        name: 'maintenance',
        type: 'radio',
        value: 'designed'
      },
      label: 'Designed'
    },
    {
      input: {
        id: 'noMaintenance',
        name: 'maintenance',
        type: 'radio',
        value: 'noMaintenance'
      },
      label: 'No maintenance'
    }
  ]

  return (
    <div>
      <h3 className="my-1">Estate Properties</h3>
      {/* Rooms */}
      <Input
        fieldName={'Number of Rooms'}
        options={{
          type: 'number',
          name: 'rooms',
          value: rooms === 0 ? '' : rooms,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Sqm */}
      <Input
        fieldName={'Square meters'}
        options={{
          type: 'number',
          name: 'sqm',
          value: sqm === 0 ? '' : sqm,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Living rooms sqm */}
      <Input
        fieldName={'Living rooms sqm'}
        options={{
          type: 'number',
          name: 'livingRoomsSqm',
          value: livingRoomsSqm === 0 ? '' : livingRoomsSqm,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Kitchen sqm */}
      <Input
        fieldName={'Kitchen sqm'}
        options={{
          type: 'number',
          name: 'kitchenSqm',
          value: kitchenSqm === 0 ? '' : kitchenSqm,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Floor */}
      <Input
        fieldName={'Floor'}
        options={{
          type: 'number',
          name: 'floor',
          value: floor === 0 ? '' : floor,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Total floors */}
      <Input
        fieldName={'Total floors'}
        options={{
          type: 'number',
          name: 'totalFloors',
          value: totalFloors === 0 ? '' : totalFloors,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Maintenance */}
      <SwitchInput
        fieldName={'Maintenance'}
        options={maintenanceOptions}
        onChange={onChange}
      />
      {/* Redevelopment */}
      <Checkbox
        label={'Redevelopment'}
        showFieldName={true}
        options={{ name: 'redevelopment', id: 'redevelopment' }}
        onChange={onChange}
      />
      <h3>Information about building</h3>
      <br />
      {/* Ceiling height */}
      <Input
        fieldName={'Ceiling height'}
        options={{
          type: 'number',
          name: 'ceilingHeight',
          value: ceilingHeight === 0 ? '' : ceilingHeight,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Year build */}
      <Input
        fieldName={'Year build'}
        options={{
          type: 'number',
          name: 'yearBulid',
          value: yearBulid === 0 ? '' : yearBulid,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Elevator */}
      <Checkbox
        label={'Elevator'}
        showFieldName={true}
        options={{ name: 'elevator', id: 'elevator' }}
        onChange={onChange}
      />
      {/* Parking lot */}
      <Checkbox
        label={'Parking lot'}
        showFieldName={true}
        options={{ name: 'parkingLot', id: 'parkingLot' }}
        onChange={onChange}
      />
      {/* Documented */}
      <Checkbox
        label={'Documented'}
        showFieldName={true}
        options={{ name: 'documented', id: 'documented' }}
        onChange={onChange}
      />
      {/* On kredit */}
      <Checkbox
        label={'On kredit'}
        showFieldName={true}
        options={{
          name: 'onKredit',
          id: 'onKredit',
          style: { marginLeft: '200px' }
        }}
        onChange={onChange}
      />
    </div>
  )
}

PostEstateInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostEstateInfo
