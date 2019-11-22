export function setItem(key, value) {
  try {
    value = JSON.stringify(value)
  } finally {
    window.localStorage.setItem(key, value)
  }
}

export function getItem(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)

  } catch {
    return value

  }
}

export function moveItem(key) {
  window.localStorage.moveItem(key)
}