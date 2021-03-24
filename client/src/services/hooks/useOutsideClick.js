import { useEffect } from 'react'

const useOutsideClick = (ref, onClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      let outsideClick = true

      for (let index = 0; index < ref.length; index++) {
        const element = ref[index]

        outsideClick =
          element.current && !element.current.contains(event.target)

        if (!outsideClick) {
          break
        }
      }

      if (outsideClick) onClick()
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClick])
}

export default useOutsideClick
