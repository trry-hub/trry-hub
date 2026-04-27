function normalizePath(path: string) {
  return path.replace(/\\/g, '/').replace(/\/+/g, '/')
}

function trimTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

const browserPath = {
  basename(path: string) {
    const normalized = trimTrailingSlash(normalizePath(path))
    return normalized.slice(normalized.lastIndexOf('/') + 1)
  },
  dirname(path: string) {
    const normalized = trimTrailingSlash(normalizePath(path))
    const index = normalized.lastIndexOf('/')
    return index > 0 ? normalized.slice(0, index) : '.'
  },
  join(...parts: string[]) {
    return normalizePath(parts.filter(Boolean).join('/'))
  },
  resolve(...parts: string[]) {
    return normalizePath(parts.filter(Boolean).join('/'))
  },
}

export default browserPath
