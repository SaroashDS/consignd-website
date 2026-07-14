import { useEffect } from 'react'

/* Sliding hover highlight behind .nav-links links: one pill element that
   glides to whichever link is hovered, fades out on leave. */
export function useNavHighlight() {
  useEffect(() => {
    const cleanups = []
    document.querySelectorAll('.nav-links').forEach((container) => {
      const hl = document.createElement('span')
      hl.className = 'nav-hl'
      hl.setAttribute('aria-hidden', 'true')
      container.prepend(hl)

      const move = (e) => {
        const a = e.target.closest('a')
        if (!a || !container.contains(a)) return
        const cr = container.getBoundingClientRect()
        const r = a.getBoundingClientRect()
        hl.style.width = `${r.width}px`
        hl.style.transform = `translate(${r.left - cr.left}px, -50%)`
        hl.style.opacity = '1'
      }
      const leave = () => { hl.style.opacity = '0' }

      container.addEventListener('mouseover', move)
      container.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        container.removeEventListener('mouseover', move)
        container.removeEventListener('mouseleave', leave)
        hl.remove()
      })
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])
}
