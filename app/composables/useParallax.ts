export const useParallax = () => {
  let cleanup = () => {}

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax-speed], [data-parallax-scale]')
    )

    if (!elements.length) return

    let frame = 0

    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight || 1

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const speed = Number(element.dataset.parallaxSpeed || 0)
        const distanceFromCenter = rect.top + rect.height / 2 - viewportHeight / 2
        const y = distanceFromCenter * speed * -1
        const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
        const progress = Math.min(1, Math.max(0, rawProgress))
        const scale = element.hasAttribute('data-parallax-scale') ? 0.98 + progress * 0.02 : 1

        element.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
        element.style.setProperty('--parallax-scale', scale.toFixed(4))
      })
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    cleanup = () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  })

  onBeforeUnmount(() => {
    cleanup()
  })
}
