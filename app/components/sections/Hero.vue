<template>
  <section id="inicio" class="hero-section" aria-label="Inicio">
    <div class="container-ps hero-content">

      <!-- Eyebrow -->
      <div class="hero-eyebrow reveal">
        <span class="chip">Mar del Plata · Global</span>
      </div>

      <!-- Headline -->
      <h1 class="hero-headline">
        <span class="split-line">
          <span class="split-line-inner">Creatividad</span>
        </span>
        <span class="split-line hero-headline-line2">
          <span class="split-line-inner">con raíces,</span>
        </span>
        <span class="split-line hero-headline-line3">
          <span class="split-line-inner">
            impacto
            <span class="hero-headline-accent"> sin</span>
          </span>
        </span>
        <span class="split-line">
          <span class="split-line-inner">fronteras.</span>
        </span>
      </h1>

      <!-- Bottom row -->
      <div class="hero-bottom reveal reveal-delay-3">
        <p class="hero-desc">
          Estudio creativo audiovisual y de diseño.<br>
          Con criterio, coherencia y carácter.
        </p>
        <div class="hero-actions">
          <a href="#portfolio" class="btn btn-primary" @click.prevent="scrollTo('portfolio')">
            Ver proyectos
            <span class="btn-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
          <a href="#contacto" class="btn btn-ghost" @click.prevent="scrollTo('contacto')">
            Hablemos
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll reveal reveal-delay-4" aria-hidden="true">
      <span class="hero-scroll-line">
        <span
          class="hero-scroll-progress"
          :style="{ transform: `scaleY(${scrollProgress})` }"
        />
      </span>
      <span class="text-eyebrow">scroll</span>
    </div>

    <!-- Fondo decorativo -->
    <div class="hero-bg-deco" aria-hidden="true">
      <div class="hero-bg-circle hero-bg-circle--1" />
      <div class="hero-bg-circle hero-bg-circle--2" />
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

// Progreso de scroll dentro de la sección hero (0 → 1)
const scrollProgress = ref(0)

onMounted(() => {
  // Trigger split-line animation al cargar
  setTimeout(() => {
    document.querySelectorAll('.hero-headline .split-line').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100)
    })
  }, 200)

  // Scroll progress para la línea
  const section = document.getElementById('inicio')
  const onScroll = () => {
    if (!section) return
    const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight * 0.2, 1)
    scrollProgress.value = Math.min(Math.max(window.scrollY / scrollableDistance, 0), 1)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
.hero-section {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-block: 6rem 3rem;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-eyebrow { display: flex; }

/* Headline */
.hero-headline {
  font-size: clamp(3.5rem, 7.3vw, 7rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--color-azul-900);
  margin: 0;
  display: flex;
  flex-direction: column;
}

.hero-headline-line2 { padding-left: clamp(2rem, 8vw, 8rem); }
.hero-headline-line3 { padding-left: clamp(4rem, 14vw, 14rem); }

.hero-headline-accent {
  color: var(--color-amarillo-500);
}

@media (max-width: 479px) {
  .hero-section { padding-block: 5.5rem 2rem; }
  .hero-headline { font-size: clamp(2.75rem, 14vw, 4rem); }
  .hero-headline-line2 { padding-left: 1rem; }
  .hero-headline-line3 { padding-left: 2rem; }
  .hero-desc { white-space: normal; }
  .hero-actions .btn { flex: 1; justify-content: center; }
}

/* Bottom */
.hero-bottom {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
}
@media (min-width: 768px) {
  .hero-bottom {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.hero-desc {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-on-surface-variant);
  white-space: nowrap;
}

.hero-actions {
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;
}

/* Scroll indicator */
.hero-scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 1;
}

@media (max-width: 767px) {
  .hero-scroll {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    flex-shrink: 0;
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  .hero-scroll-line { height: 36px; }
}

.hero-scroll-line {
  display: block;
  width: 2px;
  height: 80px;
  background: color-mix(in srgb, var(--color-outline-variant) 55%, transparent);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.hero-scroll-progress {
  position: absolute;
  inset: 0;
  display: block;
  border-radius: 999px;
  background: var(--color-azul-900);
  transform-origin: top center;
  transition: transform 90ms linear;
  will-change: transform;
}

/* Decoración fondo */
.hero-bg-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.hero-bg-circle {
  position: absolute;
  border-radius: 50%;
}
.hero-bg-circle--1 {
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  background: radial-gradient(circle, color-mix(in srgb, var(--color-celeste-100) 40%, transparent) 0%, transparent 70%);
  top: -20%;
  right: -10%;
}
.hero-bg-circle--2 {
  width: clamp(200px, 35vw, 500px);
  height: clamp(200px, 35vw, 500px);
  background: radial-gradient(circle, color-mix(in srgb, var(--color-amarillo-100) 50%, transparent) 0%, transparent 70%);
  bottom: 5%;
  left: -5%;
}
</style>
