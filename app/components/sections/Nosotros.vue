<template>
  <section id="nosotros" class="section-nosotros" aria-label="Nosotros">
    <div class="container-ps">

      <!-- Eyebrow + divisor -->
      <div class="section-header reveal">
        <span class="text-eyebrow">02 — Quiénes somos</span>
        <hr class="divider-ps" />
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
          <div class="persona-card reveal reveal-delay-1">
            <div class="persona-avatar persona-avatar--jonatan" aria-hidden="true">J</div>
            <div class="persona-info">
              <p class="persona-name">Jonatan</p>
              <p class="persona-role text-eyebrow">Realizador Audiovisual</p>
              <p class="text-body-sm persona-desc">Nat Geo · Disney · Discovery · DirecTV</p>
            </div>
          </div>
          <div class="persona-card reveal reveal-delay-2">
            <div class="persona-avatar persona-avatar--ana" aria-hidden="true">A</div>
            <div class="persona-info">
              <p class="persona-name">Ana</p>
              <p class="persona-role text-eyebrow">Diseñadora Gráfica & UX/UI</p>
              <p class="text-body-sm persona-desc">LG · Jumbo · Stanley · Black+Decker</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="nosotros-stats reveal reveal-delay-2">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-number">{{ stat.value }}</span>
          <span class="text-body-sm stat-label">{{ stat.label }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '50+', label: 'Marcas trabajadas' },
  { value: '4',   label: 'Países alcanzados' },
  { value: '∞',   label: 'Proyectos con propósito' },
]
</script>

<style scoped>
.section-nosotros {
  padding-block: clamp(5rem, 10vw, 9rem);
  background: var(--color-background);
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
  max-width: 18ch;
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
  .nosotros-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
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
  padding: 1.5rem;
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--duration-base) var(--ease-expo), transform var(--duration-base) var(--ease-expo);
}
.persona-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
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
}
.persona-avatar--ana {
  background: color-mix(in srgb, var(--color-amarillo-200) 50%, white);
  color: var(--color-amarillo-700);
}

.persona-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-azul-900);
  margin: 0 0 0.2rem;
}
.persona-role { margin: 0 0 0.4rem; }
.persona-desc { color: var(--color-on-surface-variant); margin: 0; }

/* Stats */
.nosotros-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding-top: clamp(2rem, 5vw, 4rem);
  border-top: 1px solid var(--color-outline-variant);
}
@media (min-width: 640px) {
  .nosotros-stats { grid-template-columns: repeat(4, 1fr); }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}
.stat-label { color: var(--color-on-surface-variant); }
</style>
