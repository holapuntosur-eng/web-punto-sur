<template>
  <section
    id="inicio"
    class="hero-section"
    aria-label="Inicio"
  >
    <div
      class="hero-atmosphere"
      aria-hidden="true"
    >
      <span
        class="hero-orb hero-orb--celeste"
        data-parallax-speed="0.05"
      />
      <span
        class="hero-orb hero-orb--amarillo"
        data-parallax-speed="0.1"
      />
      <span class="hero-grid" />
    </div>

    <div class="container-ps hero-shell">
      <div
        class="hero-kicker hero-reveal"
        style="--delay: 0.08s"
      >
        <span class="chip hero-location">
          <svg
            class="hero-location-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="4.25"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M12 2.75V5.1M12 18.9V21.25M21.25 12H18.9M5.1 12H2.75M18.54 5.46L16.88 7.12M7.12 16.88L5.46 18.54M18.54 18.54L16.88 16.88M7.12 7.12L5.46 5.46"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
          Mar del Plata · Global
        </span>
      </div>

      <div class="hero-layout">
        <div class="hero-copy">
          <h1
            class="hero-title"
            aria-label="Creatividad con raíces, impacto sin fronteras"
          >
            <span
              v-for="(line, index) in titleLines"
              :key="line.text"
              class="hero-title-line"
            >
              <span
                class="hero-title-line-inner"
                :style="{ '--delay': `${0.18 + index * 0.11}s` }"
              >
                {{ line.text }}
                <span
                  v-if="line.accent"
                  class="hero-title-accent"
                >{{ line.accent }}</span>
              </span>
            </span>
          </h1>

          <div
            class="hero-copy-bottom hero-reveal"
            style="--delay: 0.68s"
          >
            <p class="hero-description">
              Diseñamos identidad, contenido y experiencias digitales con criterio,
              coherencia y carácter.
            </p>

            <div
              class="hero-actions"
              aria-label="Acciones principales"
            >
              <a
                href="#portfolio"
                class="btn btn-primary"
                @click.prevent="scrollTo('portfolio')"
              >
                Ver proyectos
                <span class="btn-arrow">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </a>
              <a
                :href="whatsappHref"
                class="btn btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hablemos
              </a>
            </div>
          </div>
        </div>

        <button
          class="hero-scroll-pill hero-reveal"
          style="--delay: 0.62s"
          type="button"
          @click="scrollTo('reel')"
        >
          <span>Scroll</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.5 2.5V12.5M7.5 12.5L3.75 8.75M7.5 12.5L11.25 8.75"
              stroke="currentColor"
              stroke-width="1.35"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const titleLines = [
  { text: 'Creatividad' },
  { text: 'con raíces,' },
  { text: 'impacto', accent: 'sin' },
  { text: 'fronteras.' }
]
const whatsappHref = 'https://wa.me/5491131660452?text=Hola%20Punto%20Sur%2C%20quiero%20hablar%20sobre%20un%20proyecto.'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}
</script>

<style scoped>
.hero-section {
  min-height: clamp(42rem, 100dvh, 68rem);
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 22%, color-mix(in srgb, var(--color-celeste-100) 64%, transparent), transparent 32rem),
    radial-gradient(circle at 12% 86%, color-mix(in srgb, var(--color-amarillo-100) 72%, transparent), transparent 26rem),
    var(--color-background);
}

.hero-atmosphere {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(8px);
  opacity: 0.7;
  animation: heroFloat 9s var(--ease-expo) infinite alternate;
}

.hero-orb--celeste {
  width: clamp(12rem, 32vw, 30rem);
  height: clamp(12rem, 32vw, 30rem);
  top: 15%;
  right: -8%;
  background: color-mix(in srgb, var(--color-celeste-100) 72%, transparent);
}

.hero-orb--amarillo {
  width: clamp(10rem, 24vw, 22rem);
  height: clamp(10rem, 24vw, 22rem);
  bottom: 4%;
  left: -7%;
  background: color-mix(in srgb, var(--color-amarillo-100) 78%, transparent);
  animation-delay: 1.2s;
}

.hero-grid {
  position: absolute;
  inset: 0;
  opacity: 0.26;
  background-image:
    linear-gradient(color-mix(in srgb, var(--color-azul-900) 9%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--color-azul-900) 9%, transparent) 1px, transparent 1px);
  background-size: 5rem 5rem;
  mask-image: linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent);
}

.hero-shell {
  min-height: clamp(42rem, 92dvh, 58rem);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding-block: clamp(6rem, 10vw, 8rem) clamp(1rem, 3vw, 2rem);
}

.hero-kicker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: clamp(1.5rem, 4vw, 3rem);
}

.hero-location {
  gap: 0.45rem;
  padding-left: 0.7rem;
}

.hero-location-icon {
  color: var(--color-amarillo-600);
  display: block;
  flex: 0 0 auto;
  transform-origin: center;
  transform-box: fill-box;
  animation: locationSunSpin 3.8s var(--ease-inout) infinite alternate;
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: clamp(1.5rem, 5vw, 4rem);
  row-gap: 1rem;
  align-items: start;
  flex: 1;
}

.hero-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 70rem;
}

.hero-title {
  margin: 0;
  max-width: 12.5ch;
  color: var(--color-azul-900);
  font-family: var(--font-display);
  font-size: clamp(3.35rem, 7.35vw, 7.8rem);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 0.91;
}

.hero-title-line {
  display: block;
  overflow: hidden;
}

.hero-title-line-inner {
  display: block;
  animation: heroTitleIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}

.hero-title-accent {
  color: inherit;
}

.hero-copy-bottom {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 1.8rem);
  max-width: 36rem;
}

.hero-description {
  margin: 0;
  max-width: 35ch;
  color: var(--color-on-surface-variant);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
}

.hero-scroll-pill {
  justify-self: end;
  margin-top: 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.72rem;
  min-height: 2.95rem;
  padding: 0.72rem 1.15rem;
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 18%, transparent);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-surface) 28%, transparent);
  color: var(--color-azul-900);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 0.8rem 2.2rem rgba(0, 33, 60, 0.035);
  animation:
    heroReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both,
    scrollPillFloat 2.8s var(--ease-expo) infinite alternate;
  animation-delay: var(--delay), 1.35s;
  transition:
    transform var(--duration-base) var(--ease-expo),
    border-color var(--duration-base) ease,
    background var(--duration-base) ease;
}

.hero-scroll-pill:hover {
  border-color: color-mix(in srgb, var(--color-azul-900) 48%, transparent);
  background: color-mix(in srgb, var(--color-surface) 62%, transparent);
  transform: translateY(-3px);
}

.hero-scroll-pill svg {
  transition: transform var(--duration-base) var(--ease-expo);
}

.hero-scroll-pill:hover svg {
  transform: translateY(3px);
}

.hero-reveal {
  opacity: 0;
  transform: translateY(28px);
  animation: heroReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}

.hero-scroll-pill.hero-reveal {
  animation:
    heroReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both,
    scrollPillFloat 2.8s var(--ease-expo) infinite alternate;
  animation-delay: var(--delay), 1.35s;
}

@keyframes heroTitleIn {
  from { transform: translateY(112%); }
  to { transform: translateY(0); }
}

@keyframes heroReveal {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroFloat {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(1.5rem, -1rem, 0) scale(1.05); }
}

@keyframes scrollPillFloat {
  from { translate: 0 0; }
  to { translate: 0 0.45rem; }
}

@keyframes locationSunSpin {
  from { transform: rotate(-10deg); }
  to { transform: rotate(10deg); }
}

@media (min-width: 1600px) {
  .hero-section {
    min-height: clamp(46rem, 92dvh, 76rem);
  }

  .hero-shell {
    max-width: min(82vw, 1720px);
    min-height: clamp(46rem, 92dvh, 76rem);
    padding-block: clamp(6rem, 8vh, 8rem) clamp(2rem, 5vh, 4rem);
  }

  .hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.55fr);
    column-gap: clamp(5rem, 10vw, 12rem);
    align-items: start;
    flex: 0 0 auto;
  }

  .hero-copy {
    max-width: 76rem;
  }

  .hero-title {
    font-size: clamp(7.5rem, 5.4vw, 9.5rem);
    max-width: 11.8ch;
  }

  .hero-description {
    font-size: clamp(1.05rem, 0.9vw, 1.22rem);
  }

  .hero-scroll-pill {
    justify-self: end;
    margin-top: clamp(2.4rem, 5vw, 5rem);
  }
}

@media (min-width: 2200px) {
  .hero-shell {
    max-width: min(74vw, 1900px);
  }

  .hero-layout {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.62fr);
  }

  .hero-title {
    font-size: clamp(8.25rem, 4.6vw, 10.75rem);
  }
}

@media (min-width: 3000px) {
  .hero-section {
    min-height: clamp(54rem, 72dvh, 90rem);
  }

  .hero-shell {
    max-width: min(68vw, 2400px);
    min-height: clamp(54rem, 72dvh, 90rem);
  }

  .hero-title {
    font-size: clamp(10rem, 4vw, 13.5rem);
  }

  .hero-copy-bottom {
    max-width: 42rem;
  }

  .hero-description {
    font-size: clamp(1.15rem, 1vw, 1.45rem);
  }
}

@media (max-width: 767px) {
  .hero-kicker {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-title {
    font-size: clamp(2.75rem, 11.6vw, 4.55rem);
  }

  .hero-copy-bottom {
    align-items: start;
  }

  .hero-scroll-pill {
    position: absolute;
    top: clamp(8.9rem, 27vw, 10.6rem);
    right: var(--margin-mobile);
    width: fit-content;
    max-width: calc(100vw - (var(--margin-mobile) * 2));
    min-height: 2.55rem;
    padding: 0.58rem 0.78rem;
    font-size: 0.58rem;
    letter-spacing: 0.045em;
  }

  .hero-actions .btn {
    flex: 1;
    justify-content: center;
  }

}

@media (max-width: 479px) {
  .hero-shell {
    min-height: auto;
    padding-block: 5.5rem 0.9rem;
  }

  .hero-copy {
    gap: 1.25rem;
  }

  .hero-copy-bottom {
    gap: 1.1rem;
  }

}

@media (prefers-reduced-motion: reduce) {
  .hero-orb,
  .hero-location-icon,
  .hero-scroll-pill,
  .hero-title-line-inner,
  .hero-reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
