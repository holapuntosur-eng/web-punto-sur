<template>
  <section
    id="portfolio"
    class="section-portfolio"
    aria-label="Portfolio"
  >
    <div class="container-ps">
      <div class="section-header reveal">
        <span class="text-eyebrow">03 — Portfolio</span>
        <hr class="divider-ps">
      </div>

      <div class="portfolio-top">
        <h2 class="text-h2 portfolio-title">
          <span class="split-line"><span class="split-line-inner">El camino</span></span>
          <span class="split-line"><span class="split-line-inner">recorrido.</span></span>
        </h2>
        <p class="text-body-lg portfolio-sub reveal reveal-delay-2">
          Cada proyecto deja una huella. Marcas que confiaron en nuestra mirada para comunicar con impacto.
        </p>
      </div>

      <!-- Grid proyectos -->
      <ul
        class="portfolio-grid"
        role="list"
      >
        <li
          v-for="(proyecto, i) in proyectos"
          :key="proyecto.id"
          class="proyecto-card reveal"
          :class="`reveal-delay-${i + 1}`"
        >
          <div
            class="proyecto-img"
            :style="{ background: proyecto.color }"
            aria-hidden="true"
          >
            <video
              v-if="proyecto.video"
              class="proyecto-video"
              :src="proyecto.video"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            />
            <span
              v-else
              class="proyecto-placeholder"
            >{{ proyecto.initials }}</span>
            <span
              class="proyecto-plus"
              aria-hidden="true"
            >+</span>
          </div>
          <div class="proyecto-info">
            <div class="proyecto-meta">
              <span class="chip">{{ proyecto.tipo }}</span>
              <span class="proyecto-year text-eyebrow">{{ proyecto.year }}</span>
            </div>
            <h3 class="proyecto-title">
              {{ proyecto.title }}
            </h3>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const proyectos = [
  { id: 1, title: 'Producción IA', tipo: 'IA aplicada', year: '2024', color: 'linear-gradient(135deg, #00213c 0%, #153756 100%)', initials: 'IA', video: '/videos/postcard-produccion-ia.webm' },
  { id: 2, title: 'Social Media Design', tipo: 'Branding & Social', year: '2024', color: 'linear-gradient(135deg, #1e384a 0%, #062234 100%)', initials: 'SM', video: '/videos/postcard-social-media-design.webm' },
  { id: 3, title: 'Sitio Web & UX', tipo: 'Digital', year: '2022', color: 'linear-gradient(135deg, #6c5d2c 0%, #f3dea1 100%)', initials: 'JU', video: '/videos/postcard-product-design.webm' },
  { id: 4, title: 'Postproducción audiovisual', tipo: 'Audiovisual', year: '2024', color: 'linear-gradient(135deg, #294969 0%, #82a0c5 100%)', initials: 'PA', video: '/videos/postcard-postproduccion-audiovisual.webm' }
]
</script>

<style scoped>
.section-portfolio {
  padding-block: clamp(5rem, 10vw, 9rem);
  background:
    radial-gradient(circle at 84% 12%, color-mix(in srgb, var(--color-amarillo-100) 66%, transparent), transparent 24rem),
    var(--color-neutral-50);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.section-header .divider-ps { flex: 1; }

/* Top */
.portfolio-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: end;
}
@media (min-width: 768px) {
  .portfolio-top { grid-template-columns: 1fr 1fr; }
}
.portfolio-title { color: var(--color-azul-900); margin: 0; }
.portfolio-title {
  font-size: clamp(2.7rem, 5.8vw, 6rem);
  font-weight: 500;
  line-height: 0.98;
}
.portfolio-sub   { color: var(--color-on-surface-variant); margin: 0; max-width: 32ch; }

/* Grid */
.portfolio-grid {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(3rem, 8vw, 6rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 2vw, 1.25rem);
}
@media (min-width: 640px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Card */
.proyecto-card {
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(1.6rem, 3vw, 2.75rem);
  overflow: hidden;
  background: rgba(255,255,255,0.76);
  box-shadow: 0 1.5rem 4rem rgba(0, 33, 60, 0.08);
  position: relative;
  backdrop-filter: blur(12px);
  transition:
    border-color var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo),
    box-shadow var(--duration-base) var(--ease-expo);
}
.proyecto-card:hover {
  border-color: color-mix(in srgb, var(--color-amarillo-400) 45%, transparent);
  transform: translateY(-8px);
  box-shadow: 0 2rem 5rem rgba(0, 33, 60, 0.14);
}

.proyecto-img {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transform-origin: center;
}
.proyecto-img::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 45%, rgba(0, 33, 60, 0.5)),
    radial-gradient(circle at 28% 24%, rgba(255,255,255,0.3), transparent 10rem),
    linear-gradient(145deg, transparent, rgba(255,255,255,0.16));
  opacity: 0.58;
  transition: opacity var(--duration-base) ease, transform var(--duration-base) var(--ease-expo);
}
.proyecto-card:hover .proyecto-img::after {
  opacity: 0.88;
  transform: scale(1.05);
}

.proyecto-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 900ms var(--ease-expo), filter var(--duration-base) ease;
}

.proyecto-card:hover .proyecto-video {
  filter: saturate(1.05);
  transform: scale(1.05);
}

.proyecto-plus {
  position: absolute;
  right: clamp(1rem, 2vw, 1.35rem);
  bottom: clamp(1rem, 2vw, 1.35rem);
  z-index: 2;
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border: 1px solid rgba(255,255,255,0.72);
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  color: #ffffff;
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 1;
  backdrop-filter: blur(12px);
  transition:
    transform var(--duration-base) var(--ease-expo),
    background var(--duration-base) ease,
    color var(--duration-base) ease;
}

.proyecto-card:hover .proyecto-plus {
  background: #ffffff;
  color: var(--color-azul-900);
  transform: rotate(90deg);
}

.proyecto-placeholder {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 6.25rem);
  font-weight: 500;
  letter-spacing: -0.04em;
  color: rgba(255,255,255,0.34);
  z-index: 1;
}

.proyecto-info {
  padding: clamp(1.25rem, 2.5vw, 1.9rem);
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
}

.proyecto-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.proyecto-year { color: var(--color-outline); }

.proyecto-title {
  font-size: clamp(1.08rem, 1.8vw, 1.45rem);
  font-weight: 600;
  color: var(--color-azul-900);
  margin: 0;
  line-height: 1.12;
  letter-spacing: -0.03em;
  transition: transform var(--duration-base) var(--ease-expo);
}

.proyecto-card:hover .proyecto-title {
  transform: translateY(-0.35rem);
}
</style>
