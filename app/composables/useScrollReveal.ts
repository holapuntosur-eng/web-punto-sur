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
    const targets = document.querySelectorAll<HTMLElement>('.reveal, .split-line, .line-grow')

    if (!targets.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, defaults)

    targets.forEach(el => observer.observe(el))

    onUnmounted(() => observer.disconnect())
  })
}
