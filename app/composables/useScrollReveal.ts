/**
 * useScrollReveal
 * Observa elementos con clase `.reveal` o `.split-line` y les agrega
 * la clase `visible` cuando entran al viewport.
 */
export function useScrollReveal(options?: IntersectionObserverInit) {
  const defaults: IntersectionObserverInit = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
    ...options
  }

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, defaults)

    function observeTargets() {
      const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.visible), .split-line:not(.visible), .line-grow:not(.visible)')

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

        if (isAlreadyVisible) {
          el.classList.add('visible')
          return
        }

        observer.observe(el)
      })
    }

    observeTargets()
    window.setTimeout(observeTargets, 250)

    onUnmounted(() => observer.disconnect())
  })
}
