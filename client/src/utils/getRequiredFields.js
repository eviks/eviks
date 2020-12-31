export default (formName, currentStep = null, estateType = null) => {
  switch (formName) {
    case 'POST_FORM':
      switch (currentStep) {
        case 0:
          let fileds = ['userType', 'estateType', 'dealType']
          if (estateType === 'apartment') fileds = [...fileds, 'apartmentType']
          return fileds
        case 1:
          return ['city', 'address']
        case 2:
          let fields = ['rooms', 'sqm', 'maintenance']
          if (estateType === 'apartment') {
            fields = [...fields, 'floor', 'totalFloors']
          } else {
            fields = [...fields, 'lotSqm']
          }
          return fields
        case 4:
          return ['description']
        case 5:
          return ['images']
        case 6:
          return ['price']
        case 7:
          return ['userName', 'contact']
        default:
          return []
      }
    default:
      return []
  }
}
