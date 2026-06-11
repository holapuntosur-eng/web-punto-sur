<template>
  <section id="servicios" class="section-servicios" aria-label="Servicios">
    <div class="container-ps">

      <div class="section-header reveal">
        <span class="text-eyebrow section-eyebrow-inv">03 — Nuestras herramientas</span>
        <hr class="divider-inv" />
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
      <ul class="servicios-grid" role="list">
        <li
          v-for="(srv, i) in servicios"
          :key="srv.id"
          class="servicio-item reveal"
          :class="`reveal-delay-${(i % 4) + 1}`"
        >
          <div class="servicio-inner">
            <div class="servicio-header">
              <span class="servicio-num text-eyebrow-inv">0{{ i + 1 }}</span>
              <UIcon :name="srv.icon" class="servicio-icon" aria-hidden="true" />
            </div>
            <h3 class="servicio-title">{{ srv.title }}</h3>
            <p class="servicio-desc">{{ srv.desc }}</p>
            <div class="servicio-tags">
              <span v-for="tag in srv.tags" :key="tag" class="chip chip-inv">{{ tag }}</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- Cómo trabajamos -->
      <div class="como-trabajamos reveal">
        <h3 class="text-h3 como-title">Cómo trabajamos</h3>
        <ol class="como-steps" role="list">
          <li v-for="(step, i) in pasos" :key="i" class="como-step reveal" :class="`reveal-delay-${i + 1}`">
            <span class="como-num text-eyebrow">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="como-text text-body-md">{{ step }}</span>
          </li>
        </ol>
      </div>

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
  },
]

const pasos = [
  'Exploramos tu marca y su contexto competitivo.',
  'Definimos una estrategia clara y medible.',
  'Diseñamos y producimos piezas que comunican con propósito.',
  'Acompañamos el proceso y optimizamos para asegurar resultados reales.',
]
</script>

<style scoped>
.section-servicios {
  padding-block: clamp(5rem, 10vw, 9rem);
  background: var(--color-azul-900);
  color: #ffffff;
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
}

.servicios-sub {
  color: rgba(255,255,255,0.6);
  margin: 0;
}

/* Grid */
.servicios-grid {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(3rem, 8vw, 7rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-top: 1px solid rgba(255,255,255,0.12);
}
@media (min-width: 640px) {
  .servicios-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .servicios-grid { grid-template-columns: repeat(3, 1fr); }
}

.servicio-item {
  border-bottom: 1px solid rgba(255,255,255,0.12);
  border-right: none;
}
@media (min-width: 640px) {
  .servicio-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.12); }
}
@media (min-width: 1024px) {
  .servicio-item { border-right: 1px solid rgba(255,255,255,0.12); }
  .servicio-item:nth-child(3n) { border-right: none; }
}

.servicio-inner {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  height: 100%;
  transition: background var(--duration-base) ease;
}
.servicio-item:hover .servicio-inner {
  background: rgba(255,255,255,0.04);
}

.servicio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.servicio-num { color: var(--color-amarillo-300); }

.servicio-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: rgba(255,255,255,0.3);
  transition: color var(--duration-base) ease, transform var(--duration-base) var(--ease-expo);
}
.servicio-item:hover .servicio-icon {
  color: var(--color-amarillo-300);
  transform: rotate(45deg) scale(1.2);
}

.servicio-title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
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
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.7);
}

/* Cómo trabajamos */
.como-trabajamos {
  border-top: 1px solid rgba(255,255,255,0.12);
  padding-top: clamp(2.5rem, 5vw, 4rem);
}

.como-title {
  color: #ffffff;
  margin-bottom: 2.5rem;
}

.como-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  counter-reset: steps;
}
@media (min-width: 768px) {
  .como-steps { grid-template-columns: repeat(2, 1fr); }

  .como-step {
    padding: 1.75rem 2rem;
    border-right: 1px solid rgba(255,255,255,0.08);
  }

  .como-step:nth-child(odd) { padding-left: 0; }
  .como-step:nth-child(even) { border-right: none; }
}
@media (min-width: 1024px) {
  .como-steps { grid-template-columns: repeat(4, 1fr); }
}

.como-step {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 1.5rem 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
@media (min-width: 1024px) {
  .como-step {
    border-bottom: none;
    border-right: 1px solid rgba(255,255,255,0.08);
    padding: 0 clamp(1.5rem, 2.2vw, 2.5rem);
  }

  .como-step:nth-child(odd) { padding-left: clamp(1.5rem, 2.2vw, 2.5rem); }
  .como-step:nth-child(even) { border-right: 1px solid rgba(255,255,255,0.08); }
  .como-step:first-child { padding-left: 0; }
  .como-step:last-child {
    padding-right: 0;
    border-right: none;
  }
}

.como-num { color: var(--color-amarillo-300); }
.como-text { color: rgba(255,255,255,0.7); }
</style>
