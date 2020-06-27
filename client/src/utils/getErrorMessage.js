export default (fieldName, fields) => {
  if (fieldName === 'address') {
    return fields.estateType === 'apartment'
      ? 'createPost.mapInfo.wrongApartment'
      : 'createPost.mapInfo.wrongHouse'
  }

  return 'form.requiredField'
}
