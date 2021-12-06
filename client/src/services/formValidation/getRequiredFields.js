const getRequiredFields = (formName, additionalData = null) => {
  switch (formName) {
    case 'POST_FORM':
      switch (additionalData.currentStep) {
        case 0:
          let fileds = ['userType', 'estateType', 'dealType'];
          if (additionalData.estateType === 'apartment')
            fileds = [...fileds, 'apartmentType'];
          return fileds;
        case 1:
          return ['city', 'address'];
        case 2:
          let fields = ['rooms', 'sqm', 'renovation'];
          if (additionalData.estateType === 'apartment') {
            fields = [...fields, 'floor', 'totalFloors'];
          } else {
            fields = [...fields, 'lotSqm'];
          }
          return fields;
        case 4:
          return ['description'];
        case 5:
          return ['images'];
        case 6:
          return ['price'];
        case 7:
          return ['username', 'contact'];
        default:
          return [];
      }
    case 'USER_SETTINGS':
      return ['displayName', 'password', 'passwordConfirmation'];
    case 'REGISTER':
      return ['username', 'displayName', 'email', 'password'];
    default:
      return [];
  }
};

export default getRequiredFields;
