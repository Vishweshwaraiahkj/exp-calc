/**
 * @param {*} elTargetRef
 * @param {*} callbackFn
 * @returns
 */

import { onBeforeUnmount, onMounted } from 'vue'

const useClickOutside = (elTargetRef, callbackFn) => {
  if (!elTargetRef) return

  const listener = (e) => {
    const includesTarget = e.composedPath().includes(elTargetRef.value)
    if (e.target === elTargetRef.value || includesTarget) {
      return
    }
    if (typeof callbackFn === 'function') {
      callbackFn()
    }
  }

  onMounted(() => {
    window.addEventListener('click', listener)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', listener)
  })

  return {
    listener
  }
}

export default useClickOutside
