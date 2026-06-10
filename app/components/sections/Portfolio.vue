<template>
  <section id="portfolio" class="section-portfolio" aria-label="Portfolio">
    <div class="container-ps">

      <div class="section-header reveal">
        <span class="text-eyebrow">04 — Portfolio</span>
        <hr class="divider-ps" />
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

      <!-- Filtros -->
      <div class="portfolio-filters reveal reveal-delay-2">
        <button
          v-for="f in filters"
          :key="f.id"
          class="filter-btn"
          :class="{ active: activeFilter === f.id }"
          @click="activeFilter = f.id"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Grid proyectos -->
      <TransitionGroup name="portfolio" tag="ul" class="portfolio-grid" role="list">
        <li
          v-for="(proyecto, i) in proyectosFiltrados"
          :key="proyecto.id"
          class="proyecto-card reveal"
          :class="`reveal-delay-${(i % 3) + 1}`"
        >
          <div class="proyecto-img" :style="{ background: proyecto.color }" aria-hidden="true">
            <span class="proyecto-placeholder">{{ proyecto.initials }}</span>
          </div>
          <div class="proyecto-info">
            <div class="proyecto-meta">
              <span class="chip">{{ proyecto.tipo }}</span>
              <span class="proyecto-year text-eyebrow">{{ proyecto.year }}</span>
            </div>
            <h3 class="proyecto-title">{{ proyecto.title }}</h3>
            <p class="proyecto-cliente text-body-sm">{{ proyecto.cliente }}</p>
          </div>
          <div class="proyecto-hover-overlay" aria-hidden="true">
            <span class="proyecto-hover-icon">↗</span>
          </div>
        </li>
      </TransitionGroup>

      <!-- Clientes -->
      <div class="clientes-strip reveal">
        <p class="text-eyebrow clientes-label">Trabajamos con</p>
        <ul class="clientes-list" role="list">
          <li v-for="c in clientes" :key="c" class="cliente-item">{{ c }}</li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const filters = [
  { id: 'todos',      label: 'Todos' },
  { id: 'audiovisual', label: 'Audiovisual' },
  { id: 'branding',   label: 'Branding' },
  { id: 'digital',    label: 'Digital' },
]

const proyectos = [
  { id: 1, title: 'Campaña Institucional', cliente: 'National Geographic', tipo: 'Audiovisual', year: '2023', color: 'linear-gradient(135deg, #00213c 0%, #153756 100%)', initials: 'NG', filtro: 'audiovisual' },
  { id: 2, title: 'Identidad Visual', cliente: 'LG Electronics', tipo: 'Branding', year: '2023', color: 'linear-gradient(135deg, #1e384a 0%, #062234 100%)', initials: 'LG', filtro: 'branding' },
  { id: 3, title: 'Sitio Web & UX', cliente: 'Jumbo', tipo: 'Digital', year: '2022', color: 'linear-gradient(135deg, #6c5d2c 0%, #f3dea1 100%)', initials: 'JU', filtro: 'digital' },
  { id: 4, title: 'Serie Documental', cliente: 'Discovery Channel', tipo: 'Audiovisual', year: '2022', color: 'linear-gradient(135deg, #294969 0%, #82a0c5 100%)', initials: 'DC', filtro: 'audiovisual' },
  { id: 5, title: 'Packaging & Brand', cliente: 'Stanley', tipo: 'Branding', year: '2021', color: 'linear-gradient(135deg, #2e3132 0%, #73777e 100%)', initials: 'ST', filtro: 'branding' },
  { id: 6, title: 'Campaña Digital', cliente: 'DirecTV', tipo: 'Digital', year: '2021', color: 'linear-gradient(135deg, #00213c 0%, #4a6d8e 100%)', initials: 'DT', filtro: 'digital' },
]

const clientes = ['Nat Geo', 'Disney', 'Discovery', 'LG', 'Jumbo', 'Stanley', 'Black+Decker', 'DirecTV', 'Emergencias']

const activeFilter = ref('todos')

const proyectosFiltrados = computed(() =>
  activeFilter.value === 'todos'
    ? proyectos
    : proyectos.filter(p => p.filtro === activeFilter.value)
)
</script>

<style scoped>
.section-portfolio {
  padding-block: clamp(5rem, 10vw, 9rem);
  background: var(--color-neutral-50);
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
.portfolio-sub   { color: var(--color-on-surface-variant); margin: 0; max-width: 32ch; }

/* Filtros */
.portfolio-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-outline-variant);
  background: transparent;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  transition: all var(--duration-fast) ease;
}
.filter-btn:hover {
  border-color: var(--color-azul-700);
  color: var(--color-azul-700);
}
.filter-btn.active {
  background: var(--color-azul-900);
  border-color: var(--color-azul-900);
  color: #ffffff;
}

/* Grid */
.portfolio-grid {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(3rem, 8vw, 6rem);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .portfolio-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Card */
.proyecto-card {
  border-radius: var(--radius-2xl);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  position: relative;
  transition: transform var(--duration-base) var(--ease-expo), box-shadow var(--duration-base) var(--ease-expo);
}
.proyecto-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.proyecto-img {
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.proyecto-placeholder {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: rgba(255,255,255,0.25);
}

.proyecto-info {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.proyecto-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.proyecto-year { color: var(--color-outline); }

.proyecto-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-azul-900);
  margin: 0;
  line-height: 1.3;
}

.proyecto-cliente {
  color: var(--color-on-surface-variant);
  margin: 0;
}

/* Hover overlay */
.proyecto-hover-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 33, 60, 0.6);
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  border-radius: var(--radius-2xl);
}
.proyecto-card:hover .proyecto-hover-overlay { opacity: 1; }

.proyecto-hover-icon {
  font-size: 2.5rem;
  color: white;
  transform: rotate(0deg);
  transition: transform var(--duration-base) var(--ease-expo);
}
.proyecto-card:hover .proyecto-hover-icon { transform: rotate(0deg) scale(1.2); }

/* Transición de filtro */
.portfolio-move,
.portfolio-enter-active,
.portfolio-leave-active {
  transition: all 400ms var(--ease-expo);
}
.portfolio-enter-from,
.portfolio-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.portfolio-leave-active { position: absolute; }

/* Clientes */
.clientes-strip {
  border-top: 1px solid var(--color-outline-variant);
  padding-top: 2.5rem;
}
.clientes-label { margin-bottom: 1.25rem; }
.clientes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}
.cliente-item {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.01em;
  transition: color var(--duration-fast) ease;
}
.cliente-item:hover { color: var(--color-azul-900); }
</style>
