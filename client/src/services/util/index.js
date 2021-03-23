import _ from 'lodash'

export const prefixPath = (path, prefix) => {
  return `/${prefix}/${_.trim(path, '/')}`
}
