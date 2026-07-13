<template>
  <section
    id="nosotros"
    class="section-nosotros"
    aria-label="Nosotros"
  >
    <div class="container-ps">
      <!-- Eyebrow + divisor -->
      <div class="section-header reveal">
        <span class="text-eyebrow">02 — Quiénes somos</span>
        <hr class="divider-ps">
      </div>

      <!-- Intro statement -->
      <div class="nosotros-statement">
        <h2 class="text-h2 nosotros-title">
          <span class="split-line"><span class="split-line-inner">Nuestro sur no es</span></span>
          <span class="split-line"><span class="split-line-inner">una limitación</span></span>
          <span class="split-line"><span class="split-line-inner">geográfica. Es una</span></span>
          <span class="split-line"><span class="split-line-inner">
            perspectiva<span class="accent-dot">.</span>
          </span></span>
        </h2>
      </div>

      <!-- Dos columnas -->
      <div class="nosotros-grid">
        <!-- Texto -->
        <div class="nosotros-copy reveal">
          <p class="text-body-lg nosotros-lead">
            Con base en Mar del Plata y alcance global, somos un estudio creativo audiovisual y de diseño que trabaja con marcas que buscan comunicar con criterio, coherencia y carácter.
          </p>
          <p class="text-body-md nosotros-body">
            Creamos piezas que construyen identidad — desde la estrategia hasta la producción — combinando rigor profesional, sensibilidad estética e inteligencia artificial como herramienta para acelerar procesos y optimizar presupuestos sin perder el carácter humano de cada pieza.
          </p>
        </div>

        <!-- Card personas -->
        <div class="nosotros-personas">
          <div
            class="persona-card persona-card--bio reveal reveal-delay-1"
            tabindex="0"
          >
            <div
              class="persona-avatar persona-avatar--jonatan"
              aria-hidden="true"
            >
              <img
                src="/images/team/jonatan-marin.jpeg"
                alt=""
                class="persona-avatar-img persona-avatar-img--jonatan"
                loading="lazy"
              >
            </div>
            <div class="persona-info">
              <p class="persona-name">
                Jonatan Marin
              </p>
              <p class="persona-role text-eyebrow">
                Editor audiovisual senior & creador de IA
              </p>
              <p class="text-body-sm persona-desc">
                Más de diez años de experiencia en cine, publicidad y broadcast.
              </p>
              <p class="text-body-sm persona-bio">
                Desde Mar del Plata, combina el oficio de la edición tradicional con herramientas de IA generativa para producir contenido audiovisual y fotográfico de vanguardia. Trabajó en campañas globales de marcas como Stanley Black & Decker, Nat Geo y Discovery, entre otros.
              </p>
            </div>
          </div>
          <div
            class="persona-card persona-card--bio reveal reveal-delay-2"
            tabindex="0"
          >
            <div
              class="persona-avatar persona-avatar--ana"
              aria-hidden="true"
            >
              <img
                src="/images/team/ana-laura-sidan.png"
                alt=""
                class="persona-avatar-img"
                loading="lazy"
              >
            </div>
            <div class="persona-info">
              <p class="persona-name">
                Ana Laura Sidan
              </p>
              <p class="persona-role text-eyebrow">
                Diseñadora Gráfica & UX/UI
              </p>
              <p class="text-body-sm persona-desc">
                Especializada en identidad visual y experiencia de usuario.
              </p>
              <p class="text-body-sm persona-bio">
                Desarrollo soluciones de diseño que conectan estrategia, creatividad y resultados.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div
        ref="statsEl"
        class="nosotros-stats reveal reveal-delay-2"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-item"
        >
          <span
            class="stat-number"
            :aria-label="stat.ariaLabel"
          >{{ stat.display }}</span>
          <span class="text-body-sm stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const statsEl = ref<HTMLElement | null>(null)
const animatedValues = ref([0, 0, 0])
let hasAnimatedStats = false
let animationFrame = 0
let statsObserver: IntersectionObserver | null = null

const statItems = [
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 50, suffix: '+', label: 'Marcas trabajadas' },
  { value: 4, suffix: '', label: 'Países alcanzados' },
  { value: Number.POSITIVE_INFINITY, suffix: '', label: 'Proyectos con propósito' }
]

const stats = computed(() =>
  statItems.map((stat, index) => {
    const isInfinite = !Number.isFinite(stat.value)
    const value = isInfinite ? '∞' : `${animatedValues.value[index]}${stat.suffix}`

    return {
      ...stat,
      display: value,
      ariaLabel: isInfinite ? stat.label : `${stat.value}${stat.suffix} ${stat.label}`
    }
  })
)

function animateStats() {
  if (hasAnimatedStats) return
  hasAnimatedStats = true

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    animatedValues.value = statItems.map(stat => Number.isFinite(stat.value) ? stat.value : 0)
    return
  }

  const duration = 1250
  const startedAt = performance.now()
  const targets = statItems.map(stat => Number.isFinite(stat.value) ? stat.value : 0)

  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    const eased = 1 - Math.pow(1 - progress, 3)

    animatedValues.value = targets.map(target => Math.round(target * eased))

    if (progress < 1) {
      animationFrame = window.requestAnimationFrame(tick)
    }
  }

  animationFrame = window.requestAnimationFrame(tick)
}

onMounted(() => {
  const el = statsEl.value
  if (!el) return

  statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      animateStats()
      statsObserver?.disconnect()
      statsObserver = null
    },
    { threshold: 0.35 }
  )

  statsObserver.observe(el)
})

onBeforeUnmount(() => {
  statsObserver?.disconnect()
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.section-nosotros {
  padding-block: clamp(5rem, 10vw, 9rem);
  background:
    radial-gradient(circle at 12% 14%, color-mix(in srgb, var(--color-celeste-100) 54%, transparent), transparent 24rem),
    linear-gradient(180deg, var(--color-background), color-mix(in srgb, var(--color-celeste-50) 38%, var(--color-background)));
  position: relative;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.section-header .divider-ps {
  flex: 1;
}

/* Statement */
.nosotros-statement {
  margin-bottom: clamp(3rem, 7vw, 6rem);
}
.nosotros-title {
  color: var(--color-azul-900);
  max-width: 20ch;
  font-size: clamp(2.75rem, 6.4vw, 6.5rem);
  font-weight: 500;
  line-height: 0.96;
}
.accent-dot { color: var(--color-amarillo-500); }

/* Grid */
.nosotros-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: clamp(3rem, 7vw, 6rem);
}
@media (min-width: 768px) {
  .nosotros-grid { grid-template-columns: 0.9fr 1.1fr; gap: clamp(3rem, 7vw, 6rem); }
}

.nosotros-copy {
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(2rem, 4vw, 3rem);
  background: rgba(255,255,255,0.52);
  box-shadow: 0 1.5rem 4rem rgba(0, 33, 60, 0.06);
  backdrop-filter: blur(14px);
}

.nosotros-lead {
  color: var(--color-azul-900);
  font-weight: 500;
  margin-bottom: 1.25rem;
}
.nosotros-body { color: var(--color-on-surface-variant); }

/* Personas */
.nosotros-personas {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.persona-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(1.75rem, 3vw, 2.75rem);
  background: rgba(255,255,255,0.68);
  box-shadow: 0 1rem 3rem rgba(0, 33, 60, 0.08);
  backdrop-filter: blur(12px);
  transition:
    border-color var(--duration-base) ease,
    box-shadow var(--duration-base) var(--ease-expo),
    transform var(--duration-base) var(--ease-expo);
}
.persona-card:hover {
  border-color: color-mix(in srgb, var(--color-amarillo-400) 42%, transparent);
  box-shadow: 0 1.5rem 4rem rgba(0, 33, 60, 0.12);
  transform: translateY(-6px);
}

.persona-card:focus-visible {
  outline: 3px solid var(--color-amarillo-400);
  outline-offset: 3px;
}

.persona-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  flex-shrink: 0;
  letter-spacing: -0.02em;
}
.persona-avatar--jonatan {
  background: color-mix(in srgb, var(--color-celeste-200) 40%, white);
  color: var(--color-azul-700);
  overflow: hidden;
}
.persona-avatar--ana {
  background: color-mix(in srgb, var(--color-amarillo-200) 50%, white);
  color: var(--color-amarillo-700);
  overflow: hidden;
}

.persona-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform var(--duration-base) var(--ease-expo);
}

.persona-avatar-img--jonatan {
  object-position: center 34%;
  transform: scale(1.18);
}

.persona-card--bio:hover .persona-avatar-img,
.persona-card--bio:focus-within .persona-avatar-img,
.persona-card--bio:active .persona-avatar-img {
  transform: scale(1.12);
}

.persona-card--bio:hover .persona-avatar-img--jonatan,
.persona-card--bio:focus-within .persona-avatar-img--jonatan,
.persona-card--bio:active .persona-avatar-img--jonatan {
  transform: scale(1.24);
}

.persona-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-azul-900);
  margin: 0 0 0.2rem;
}
.persona-role { margin: 0 0 0.4rem; }
.persona-desc { color: var(--color-on-surface-variant); margin: 0; }
.persona-bio {
  max-height: 0;
  overflow: hidden;
  margin: 0;
  max-width: 42ch;
  color: var(--color-on-surface-variant);
  opacity: 0;
  transform: translateY(-0.25rem);
  transition:
    max-height var(--duration-base) var(--ease-expo),
    opacity var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo),
    margin-top var(--duration-base) var(--ease-expo);
}
.persona-card--bio:hover .persona-bio,
.persona-card--bio:focus-within .persona-bio,
.persona-card--bio:focus .persona-bio,
.persona-card--bio:active .persona-bio {
  max-height: 12rem;
  margin-top: 0.6rem;
  opacity: 1;
  transform: translateY(0);
}

/* Stats */
.nosotros-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
  padding-top: 0;
  border-top: none;
}
@media (min-width: 640px) {
  .nosotros-stats { grid-template-columns: repeat(4, 1fr); }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-height: 10rem;
  justify-content: space-between;
  padding: clamp(1.2rem, 2.5vw, 1.75rem);
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(1.4rem, 3vw, 2.2rem);
  background: color-mix(in srgb, var(--color-surface) 76%, var(--color-celeste-50));
  transition:
    background var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo);
}
.stat-item:hover {
  background: color-mix(in srgb, var(--color-surface) 82%, var(--color-amarillo-50));
  transform: translateY(-4px);
}
.stat-label { color: var(--color-on-surface-variant); }
</style>
