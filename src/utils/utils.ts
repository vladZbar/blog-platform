export const normalTag = (tag) => {
  if (typeof tag !== 'string') return ''
  return tag.length > 10 ? tag.slice(0, 10).replace(/\n/g, '') + '...' : tag
}

export const normalTitle = (title) => {
  if (!/\w/.test(title)) return 'untitled'
  if (title.length > 40) return title.slice(0, 40) + '...'
  return title
}

export const normalDesc = (description) => {
  if (!/\w/.test(description)) return 'no descpription...'
  if (description.length > 250) return description.slice(0, 250) + '...'
  return description
}
