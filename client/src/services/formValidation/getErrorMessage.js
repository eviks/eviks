const getErrorMessage = (fieldName, errorCode = '') => {
  switch (fieldName) {
    case 'username':
      switch (errorCode) {
        case '1':
          return 'auth.invalidUserName';
        case '0':
        default:
          return 'form.requiredField';
      }
    case 'password':
      return 'userMenu.passwordError';
    case 'passwordConfirmation':
      return 'createPost.mapInfo.wrongAddress';
    case 'city':
      return 'createPost.mapInfo.wrongCity';
    default:
      return 'form.requiredField';
  }
};

export default getErrorMessage;
