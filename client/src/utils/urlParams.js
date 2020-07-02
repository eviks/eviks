export const setURLParams = params => {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach(key => {
    if (params[key]) searchParams.set(key, params[key])
  })
  return searchParams.toString()
}

export const getURLParams = queryString => {
  return new URLSearchParams(queryString)
}
