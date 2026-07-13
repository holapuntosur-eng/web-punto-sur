<template>
  <section
    id="servicios"
    class="section-servicios"
    aria-label="Servicios"
  >
    <div class="container-ps">
      <div class="section-header reveal">
        <span class="text-eyebrow section-eyebrow-inv">04 — Nuestras herramientas</span>
        <hr class="divider-inv">
      </div>

      <div class="servicios-top">
        <h2 class="text-h2 servicios-title">
          <span class="split-line"><span class="split-line-inner">Cada servicio</span></span>
          <span class="split-line"><span class="split-line-inner">es una coordenada.</span></span>
        </h2>
        <p class="text-body-lg servicios-sub reveal reveal-delay-2">
          Combinados, trazan la ruta<br>completa de tu marca.
        </p>
      </div>

      <!-- Grid de servicios -->
      <ul
        class="servicios-grid"
        role="list"
      >
        <li
          v-for="(srv, i) in servicios"
          :key="srv.id"
          class="servicio-item reveal"
          :class="`reveal-delay-${(i % 4) + 1}`"
        >
          <div class="servicio-inner">
            <div class="servicio-header">
              <span class="servicio-num text-eyebrow-inv">0{{ i + 1 }}</span>
              <UIcon
                :name="srv.icon"
                class="servicio-icon"
                aria-hidden="true"
              />
            </div>
            <h3 class="servicio-title">
              {{ srv.title }}
            </h3>
            <p class="servicio-desc">
              {{ srv.desc }}
            </p>
            <div class="servicio-tags">
              <span
                v-for="tag in srv.tags"
                :key="tag"
                class="chip chip-inv"
              >{{ tag }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const servicios = [
  {
    id: 'diseno-grafico',
    icon: 'i-lucide-clapperboard',
    title: 'Diseño Gráfico & Audiovisual',
    desc: 'Branding, identidad visual, logotipos, diseño editorial, packaging y producción audiovisual. Potenciado con IA.',
    tags: ['Branding', 'Video', 'Packaging']
  },
  {
    id: 'digital',
    icon: 'i-lucide-panels-top-left',
    title: 'Diseño Digital & UX/UI',
    desc: 'Sitios web, newsletters y experiencias digitales diseñadas desde la usabilidad y la conversión.',
    tags: ['Web', 'UX/UI', 'Newsletter']
  },
  {
    id: 'redes',
    icon: 'i-lucide-smartphone',
    title: 'Contenido para Redes',
    desc: 'Piezas estáticas, reels, historias y TikToks con estrategia, consistencia y estilo.',
    tags: ['Instagram', 'Reels', 'TikTok']
  },
  {
    id: 'estrategia',
    icon: 'i-lucide-chart-no-axes-combined',
    title: 'Estrategia & Marketing',
    desc: 'Planificación de comunicación, segmentación de audiencias y performance.',
    tags: ['Estrategia', 'Performance', 'Audiencias']
  },
  {
    id: 'concepto',
    icon: 'i-lucide-lightbulb',
    title: 'Creatividad & Concepto',
    desc: 'Desarrollo de concepto, big idea y campañas integrales que conectan con las personas.',
    tags: ['Concepto', 'Campaña', 'Big idea']
  },
  {
    id: 'ia',
    icon: 'i-lucide-sparkles',
    title: 'IA Aplicada',
    desc: 'Integramos inteligencia artificial en cada etapa del proceso para escalar resultados y reducir tiempos.',
    tags: ['IA', 'Automatización', 'Eficiencia']
  }
]
</script>

<style scoped>
.section-servicios {
  padding-block: clamp(5rem, 10vw, 9rem);
  background:
    radial-gradient(circle at 85% 8%, rgba(176, 202, 224, 0.16), transparent 24rem),
    radial-gradient(circle at 12% 86%, rgba(243, 222, 161, 0.12), transparent 22rem),
    var(--color-azul-900);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}

.section-eyebrow-inv {
  color: var(--color-amarillo-300);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.divider-inv {
  flex: 1;
  border: none;
  border-top: 1px solid rgba(255,255,255,0.15);
  margin: 0;
}

/* Top */
.servicios-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: clamp(3rem, 7vw, 5rem);
  align-items: end;
}
@media (min-width: 768px) {
  .servicios-top { grid-template-columns: 1fr 1fr; }
}

.servicios-title {
  color: #ffffff;
  margin: 0;
  font-size: clamp(2.6rem, 5.5vw, 5.75rem);
  font-weight: 500;
  line-height: 0.98;
}

.servicios-sub {
  color: rgba(255,255,255,0.66);
  margin: 0;
  max-width: 28ch;
}

/* Grid */
.servicios-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.875rem;
  border-top: none;
}
@media (min-width: 640px) {
  .servicios-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .servicios-grid { grid-template-columns: repeat(3, 1fr); }
}

.servicio-item {
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: clamp(1.5rem, 3vw, 2.25rem);
  background: rgba(255,255,255,0.045);
  overflow: hidden;
  box-shadow: 0 1.25rem 4rem rgba(0, 0, 0, 0.09);
  transition:
    border-color var(--duration-base) ease,
    background var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo);
}
@media (min-width: 640px) {
  .servicio-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.1); }
}
@media (min-width: 1024px) {
  .servicio-item { border-right: 1px solid rgba(255,255,255,0.1); }
  .servicio-item:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.1); }
}
.servicio-item:hover {
  border-color: rgba(243, 222, 161, 0.34);
  background: rgba(255,255,255,0.072);
  transform: translateY(-8px);
}

.servicio-inner {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  height: 100%;
}

.servicio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.servicio-num { color: var(--color-amarillo-300); }

.servicio-icon {
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.58rem;
  border-radius: var(--radius-full);
  color: rgba(255,255,255,0.68);
  background: rgba(255,255,255,0.08);
  transition: color var(--duration-base) ease, transform var(--duration-base) var(--ease-expo);
}
.servicio-item:hover .servicio-icon {
  color: var(--color-amarillo-300);
  transform: rotate(45deg) scale(1.2);
}

.servicio-title {
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.12;
  letter-spacing: -0.03em;
}

.servicio-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.55);
  margin: 0;
  flex: 1;
}

.servicio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}

.chip-inv {
  background: rgba(255,255,255,0.085);
  color: rgba(255,255,255,0.76);
  border: 1px solid rgba(255,255,255,0.06);
}
</style>
