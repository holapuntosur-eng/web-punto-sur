<template>
  <div class="ds">
    <!-- ─── Sidebar nav ─── -->
    <aside class="ds-sidebar">
      <div class="ds-sidebar-inner">
        <a href="/" class="ds-logo">Punto Sur<span class="ds-logo-dot">.</span></a>
        <p class="ds-sidebar-label">Design System</p>
        <nav class="ds-nav" aria-label="Secciones del sistema">
          <a
            v-for="s in sections"
            :key="s.id"
            :href="`#${s.id}`"
            class="ds-nav-link"
            :class="{ active: activeSection === s.id }"
            @click.prevent="scrollTo(s.id)"
          >
            <span class="ds-nav-num">{{ s.num }}</span>{{ s.label }}
          </a>
        </nav>
        <a href="/" class="ds-back">← Volver al sitio</a>
      </div>
    </aside>

    <!-- ─── Contenido ─── -->
    <main class="ds-main">

      <!-- Header -->
      <header class="ds-header">
        <span class="ds-eyebrow">Living Style Guide · v1.0</span>
        <h1 class="ds-title">Sistema de diseño</h1>
        <p class="ds-intro">
          Arquitectura de tokens en tres capas — <strong>primitivos → semánticos → componentes</strong>.
          Modern Corporate: autoridad profesional con atmósfera cálida y aireada.
          Pill-shaped, mucho espacio en blanco, Montserrat.
        </p>
        <div class="ds-arch">
          <div class="ds-arch-layer">
            <span class="ds-arch-n">01</span>
            <strong>Primitivos</strong>
            <code>--color-azul-900</code>
            <small>Valores crudos. La paleta completa.</small>
          </div>
          <span class="ds-arch-arrow">→</span>
          <div class="ds-arch-layer">
            <span class="ds-arch-n">02</span>
            <strong>Semánticos</strong>
            <code>--color-primary</code>
            <small>Alias por propósito. Referencian primitivos.</small>
          </div>
          <span class="ds-arch-arrow">→</span>
          <div class="ds-arch-layer">
            <span class="ds-arch-n">03</span>
            <strong>Componente</strong>
            <code>--button-bg</code>
            <small>Específicos. Referencian semánticos.</small>
          </div>
        </div>
      </header>

      <!-- 01 · Colores -->
      <section id="colores" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">01</span>
          <h2 class="ds-section-title">Color</h2>
        </div>

        <h3 class="ds-sub">Capa 1 · Primitivos</h3>
        <div v-for="ramp in colorRamps" :key="ramp.name" class="ds-ramp">
          <p class="ds-ramp-name">{{ ramp.name }}</p>
          <div class="ds-ramp-swatches">
            <button
              v-for="step in steps"
              :key="step"
              class="ds-swatch"
              :style="{ background: `var(--color-${ramp.token}-${step})` }"
              :class="{ 'is-light': step <= 300 }"
              @click="copy(`--color-${ramp.token}-${step}`)"
              :title="`Copiar --color-${ramp.token}-${step}`"
            >
              <span class="ds-swatch-step">{{ step }}</span>
            </button>
          </div>
        </div>

        <h3 class="ds-sub ds-sub-spaced">Capa 2 · Semánticos</h3>
        <div class="ds-semantic-grid">
          <button
            v-for="t in semanticColors"
            :key="t.token"
            class="ds-semantic"
            @click="copy(t.token)"
            :title="`Copiar ${t.token}`"
          >
            <span class="ds-semantic-chip" :style="{ background: `var(${t.token})`, borderColor: t.border ? 'var(--color-outline-variant)' : 'transparent' }" />
            <span class="ds-semantic-info">
              <code>{{ t.token }}</code>
              <small>{{ t.use }}</small>
            </span>
          </button>
        </div>
      </section>

      <!-- 02 · Tipografía -->
      <section id="tipografia" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">02</span>
          <h2 class="ds-section-title">Tipografía</h2>
        </div>
        <p class="ds-section-desc">
          <strong>Montserrat</strong> en exclusiva. Headlines en pesos 700-800 con tracking negativo.
          Body en 400. Labels en 600 uppercase con tracking positivo.
        </p>
        <div class="ds-type-list">
          <div v-for="t in typeScale" :key="t.class" class="ds-type-row">
            <div class="ds-type-sample" :class="t.class">{{ t.sample }}</div>
            <div class="ds-type-meta">
              <code>.{{ t.class }}</code>
              <small>{{ t.spec }}</small>
            </div>
          </div>
        </div>
      </section>

      <!-- 03 · Espaciado y radios -->
      <section id="espaciado" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">03</span>
          <h2 class="ds-section-title">Espaciado &amp; Radios</h2>
        </div>
        <p class="ds-section-desc">Escala base de 8px. Filosofía pill-shaped: radios generosos que humanizan la interfaz.</p>

        <h3 class="ds-sub">Escala de espaciado (8px)</h3>
        <div class="ds-space-list">
          <div v-for="s in spacing" :key="s.val" class="ds-space-row">
            <span class="ds-space-label">{{ s.val }}</span>
            <div class="ds-space-bar" :style="{ width: s.px }" />
            <span class="ds-space-px">{{ s.px }}</span>
          </div>
        </div>

        <h3 class="ds-sub ds-sub-spaced">Radios</h3>
        <div class="ds-radius-grid">
          <div v-for="r in radii" :key="r.token" class="ds-radius-item">
            <div class="ds-radius-box" :style="{ borderRadius: `var(${r.token})` }" />
            <code>{{ r.token }}</code>
            <small>{{ r.val }}</small>
          </div>
        </div>
      </section>

      <!-- 04 · Elevación -->
      <section id="elevacion" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">04</span>
          <h2 class="ds-section-title">Elevación</h2>
        </div>
        <p class="ds-section-desc">Sombras extra-difusas con tinte azul (nunca grises sucios). Blur amplio, baja opacidad.</p>
        <div class="ds-shadow-grid">
          <div v-for="sh in shadows" :key="sh.token" class="ds-shadow-item">
            <div class="ds-shadow-box" :style="{ boxShadow: `var(${sh.token})` }" />
            <code>{{ sh.token }}</code>
          </div>
        </div>
      </section>

      <!-- 05 · Componentes -->
      <section id="componentes" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">05</span>
          <h2 class="ds-section-title">Componentes</h2>
        </div>

        <!-- Botones -->
        <h3 class="ds-sub">Botones</h3>
        <div class="ds-component-demo">
          <button class="btn btn-primary">
            Primary
            <span class="btn-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
        </div>
        <table class="ds-spec-table">
          <thead>
            <tr><th>Propiedad</th><th>Default</th><th>Hover</th><th>Active</th><th>Disabled</th></tr>
          </thead>
          <tbody>
            <tr><td>Fondo</td><td>primary</td><td>primary-hover</td><td>primary-active</td><td>muted</td></tr>
            <tr><td>Texto</td><td>on-primary</td><td>on-primary</td><td>on-primary</td><td>outline</td></tr>
            <tr><td>Transform</td><td>—</td><td>translateY(-2px)</td><td>translateY(0)</td><td>—</td></tr>
            <tr><td>Sombra</td><td>—</td><td>shadow-md</td><td>—</td><td>—</td></tr>
          </tbody>
        </table>

        <!-- Cards -->
        <h3 class="ds-sub ds-sub-spaced">Cards</h3>
        <div class="ds-card-demo">
          <article class="card ds-card-sample">
            <div class="ds-card-media" />
            <div class="ds-card-body">
              <span class="chip">Branding</span>
              <h4 class="ds-card-title">Card por defecto</h4>
              <p class="ds-card-text">Radio 2xl, sombra ambiental suave, hover elevado. Sin bordes — separación tonal.</p>
            </div>
          </article>
          <article class="card card-celeste ds-card-sample">
            <div class="ds-card-body">
              <span class="chip">Variante</span>
              <h4 class="ds-card-title">Card celeste</h4>
              <p class="ds-card-text">Fondo celeste al 20% para separación tonal en superficies claras.</p>
            </div>
          </article>
        </div>

        <!-- Chips e inputs -->
        <div class="ds-two-col">
          <div>
            <h3 class="ds-sub ds-sub-spaced">Chips &amp; Tags</h3>
            <div class="ds-component-demo">
              <span class="chip">Audiovisual</span>
              <span class="chip">UX/UI</span>
              <span class="chip">IA Aplicada</span>
            </div>
          </div>
          <div>
            <h3 class="ds-sub ds-sub-spaced">Inputs</h3>
            <div class="ds-input-demo">
              <input class="input-ps" type="text" placeholder="Tu nombre" />
              <input class="input-ps" type="email" placeholder="tu@email.com" />
            </div>
          </div>
        </div>
      </section>

      <!-- 06 · Movimiento -->
      <section id="movimiento" class="ds-section">
        <div class="ds-section-head">
          <span class="ds-section-num">06</span>
          <h2 class="ds-section-title">Movimiento</h2>
        </div>
        <p class="ds-section-desc">Curvas de easing y duraciones. Pasá el mouse sobre cada caja para ver la curva aplicada.</p>
        <div class="ds-motion-grid">
          <div v-for="m in motion" :key="m.token" class="ds-motion-item">
            <div class="ds-motion-track">
              <div class="ds-motion-dot" :style="{ transition: `transform var(--duration-base) var(${m.token})` }" />
            </div>
            <code>{{ m.token }}</code>
            <small>{{ m.val }}</small>
          </div>
        </div>
        <div class="ds-duration-list">
          <span v-for="d in durations" :key="d.token" class="chip">{{ d.token }} · {{ d.val }}</span>
        </div>
      </section>

      <footer class="ds-footer">
        <p>Punto Sur — Sistema de diseño · Montserrat · {{ year }}</p>
      </footer>
    </main>

    <!-- Toast de copiado -->
    <Transition name="toast">
      <div v-if="toast" class="ds-toast">{{ toast }}</div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Sistema de diseño — Punto Sur' })

const year = new Date().getFullYear()

const sections = [
  { id: 'colores',     num: '01', label: 'Color' },
  { id: 'tipografia',  num: '02', label: 'Tipografía' },
  { id: 'espaciado',   num: '03', label: 'Espaciado' },
  { id: 'elevacion',   num: '04', label: 'Elevación' },
  { id: 'componentes', num: '05', label: 'Componentes' },
  { id: 'movimiento',  num: '06', label: 'Movimiento' },
]

const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const colorRamps = [
  { name: 'Azul · primario',     token: 'azul' },
  { name: 'Amarillo · secundario', token: 'amarillo' },
  { name: 'Celeste · terciario', token: 'celeste' },
  { name: 'Neutral',             token: 'neutral' },
]

const semanticColors = [
  { token: '--color-primary',         use: 'Acciones, headlines' },
  { token: '--color-secondary',       use: 'CTA cálido, acentos' },
  { token: '--color-tertiary',        use: 'Fondos suaves, chips' },
  { token: '--color-accent',          use: 'Detalles, puntuación' },
  { token: '--color-background',      use: 'Fondo de página', border: true },
  { token: '--color-surface',         use: 'Cards, superficies', border: true },
  { token: '--color-on-surface',      use: 'Texto principal' },
  { token: '--color-on-surface-variant', use: 'Texto secundario' },
  { token: '--color-outline-variant', use: 'Bordes, divisores', border: true },
]

const typeScale = [
  { class: 'text-display', sample: 'Display', spec: 'clamp 3.5–7rem · 800 · -0.03em' },
  { class: 'text-h1',      sample: 'Headline 1', spec: 'clamp 2.5–4.5rem · 700 · -0.025em' },
  { class: 'text-h2',      sample: 'Headline 2', spec: 'clamp 2–3rem · 700 · -0.02em' },
  { class: 'text-h3',      sample: 'Headline 3', spec: 'clamp 1.5–2rem · 600 · -0.01em' },
  { class: 'text-body-lg', sample: 'Body large — texto de lectura cómoda para intros.', spec: '1.125rem · 400 · 1.65' },
  { class: 'text-body-md', sample: 'Body medium — el cuerpo de texto estándar del sitio.', spec: '1rem · 400 · 1.6' },
  { class: 'text-eyebrow', sample: 'Eyebrow / Label', spec: '0.75rem · 600 · 0.1em · uppercase' },
]

const spacing = [
  { val: '1', px: '8px' }, { val: '2', px: '16px' }, { val: '3', px: '24px' },
  { val: '4', px: '32px' }, { val: '5', px: '40px' }, { val: '6', px: '48px' },
  { val: '8', px: '64px' }, { val: '10', px: '80px' }, { val: '12', px: '96px' },
]

const radii = [
  { token: '--radius-sm', val: '0.5rem' },
  { token: '--radius-md', val: '1rem' },
  { token: '--radius-lg', val: '1.5rem' },
  { token: '--radius-xl', val: '2rem' },
  { token: '--radius-2xl', val: '3rem' },
  { token: '--radius-full', val: 'pill' },
]

const shadows = [
  { token: '--shadow-sm' }, { token: '--shadow-md' },
  { token: '--shadow-lg' }, { token: '--shadow-xl' },
]

const motion = [
  { token: '--ease-expo',  val: 'cubic-bezier(.19,1,.22,1)' },
  { token: '--ease-inout', val: 'cubic-bezier(.76,0,.24,1)' },
]

const durations = [
  { token: '--duration-fast', val: '200ms' },
  { token: '--duration-base', val: '400ms' },
  { token: '--duration-slow', val: '700ms' },
  { token: '--duration-xslow', val: '1100ms' },
]

const activeSection = ref('colores')
const toast = ref('')

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 32, behavior: 'smooth' })
}

async function copy(token: string) {
  try {
    await navigator.clipboard.writeText(`var(${token})`)
    toast.value = `Copiado: var(${token})`
    setTimeout(() => { toast.value = '' }, 1800)
  } catch {
    toast.value = token
    setTimeout(() => { toast.value = '' }, 1800)
  }
}

let observers: IntersectionObserver[] = []
onMounted(() => {
  sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) activeSection.value = s.id },
      { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' }
    )
    obs.observe(el)
    observers.push(obs)
  })
})
onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>

<style scoped>
.ds {
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-background);
  min-height: 100vh;
}
@media (min-width: 960px) {
  .ds { grid-template-columns: 260px 1fr; }
}

/* ─── Sidebar ─── */
.ds-sidebar { display: none; }
@media (min-width: 960px) {
  .ds-sidebar {
    display: block;
    position: sticky;
    top: 0;
    height: 100vh;
    border-right: 1px solid var(--color-outline-variant);
    background: var(--color-surface);
  }
}
.ds-sidebar-inner {
  padding: 2.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.ds-logo {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--color-azul-900);
  text-decoration: none;
}
.ds-logo-dot { color: var(--color-amarillo-400); }
.ds-sidebar-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin: 0.4rem 0 2.5rem;
}
.ds-nav { display: flex; flex-direction: column; gap: 0.125rem; }
.ds-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  transition: all var(--duration-fast) ease;
}
.ds-nav-link:hover { background: var(--color-neutral-100); color: var(--color-azul-900); }
.ds-nav-link.active { background: var(--color-azul-900); color: #fff; }
.ds-nav-link.active .ds-nav-num { color: var(--color-amarillo-300); }
.ds-nav-num { font-size: 0.7rem; font-weight: 600; color: var(--color-muted); }
.ds-back {
  margin-top: auto;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
}
.ds-back:hover { color: var(--color-azul-900); }

/* ─── Main ─── */
.ds-main {
  padding: 2.5rem var(--margin-mobile) 4rem;
  max-width: 1000px;
}
@media (min-width: 768px) { .ds-main { padding: 4rem 3rem 5rem; } }

/* Header */
.ds-header { margin-bottom: 4.5rem; }
.ds-eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-amarillo-600);
}
.ds-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-azul-900);
  margin: 0.75rem 0 1.25rem;
  line-height: 1.05;
}
.ds-intro {
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--color-on-surface-variant);
  max-width: 60ch;
}
.ds-intro strong { color: var(--color-azul-900); }

/* Arquitectura 3 capas */
.ds-arch {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 2.5rem;
}
.ds-arch-layer {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.25rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
.ds-arch-n {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-amarillo-600);
  letter-spacing: 0.1em;
}
.ds-arch-layer strong { font-size: 0.95rem; color: var(--color-azul-900); }
.ds-arch-layer code {
  font-size: 0.8rem;
  color: var(--color-azul-600);
  background: var(--color-neutral-100);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  align-self: flex-start;
  font-family: ui-monospace, 'SF Mono', monospace;
}
.ds-arch-layer small { font-size: 0.78rem; color: var(--color-muted); line-height: 1.45; }
.ds-arch-arrow {
  display: flex;
  align-items: center;
  color: var(--color-outline-variant);
  font-size: 1.25rem;
}

/* ─── Secciones ─── */
.ds-section {
  padding-top: 3rem;
  margin-bottom: 4rem;
  border-top: 1px solid var(--color-outline-variant);
  scroll-margin-top: 2rem;
}
.ds-section-head {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.ds-section-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-amarillo-600);
  letter-spacing: 0.1em;
}
.ds-section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-azul-900);
  margin: 0;
}
.ds-section-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-on-surface-variant);
  max-width: 60ch;
  margin: 0 0 2rem;
}
.ds-section-desc strong { color: var(--color-azul-900); }

.ds-sub {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin: 0 0 1rem;
}
.ds-sub-spaced { margin-top: 2.5rem; }

/* ─── Color ramps ─── */
.ds-ramp { margin-bottom: 1.5rem; }
.ds-ramp-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-azul-900);
  margin: 0 0 0.5rem;
}
.ds-ramp-swatches {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 4px;
}
.ds-swatch {
  aspect-ratio: 1;
  border: none;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
  transition: transform var(--duration-fast) var(--ease-expo);
  position: relative;
}
.ds-swatch:hover { transform: scale(1.12); z-index: 2; box-shadow: var(--shadow-md); }
.ds-swatch-step {
  font-size: 0.55rem;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
}
.ds-swatch.is-light .ds-swatch-step { color: rgba(0,33,60,0.55); }
@media (max-width: 640px) {
  .ds-ramp-swatches { grid-template-columns: repeat(6, 1fr); }
}

/* Semánticos */
.ds-semantic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.ds-semantic {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem;
  background: var(--color-surface);
  border: none;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-align: left;
  transition: box-shadow var(--duration-fast) ease;
}
.ds-semantic:hover { box-shadow: var(--shadow-md); }
.ds-semantic-chip {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  flex-shrink: 0;
}
.ds-semantic-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.ds-semantic-info code {
  font-size: 0.72rem;
  color: var(--color-azul-700);
  font-family: ui-monospace, 'SF Mono', monospace;
}
.ds-semantic-info small { font-size: 0.72rem; color: var(--color-muted); }

/* ─── Tipografía ─── */
.ds-type-list { display: flex; flex-direction: column; gap: 1.75rem; }
.ds-type-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--color-neutral-200);
}
.ds-type-row:last-child { border-bottom: none; }
.ds-type-sample { color: var(--color-azul-900); }
.ds-type-meta { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.ds-type-meta code {
  font-size: 0.78rem;
  color: var(--color-azul-700);
  background: var(--color-neutral-100);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-family: ui-monospace, 'SF Mono', monospace;
}
.ds-type-meta small { font-size: 0.78rem; color: var(--color-muted); }

/* ─── Espaciado ─── */
.ds-space-list { display: flex; flex-direction: column; gap: 0.625rem; }
.ds-space-row { display: flex; align-items: center; gap: 1rem; }
.ds-space-label {
  width: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-muted);
  text-align: right;
}
.ds-space-bar {
  height: 1.5rem;
  background: var(--color-azul-200);
  border-radius: var(--radius-sm);
}
.ds-space-px { font-size: 0.78rem; color: var(--color-muted); }

.ds-radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}
.ds-radius-item { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.ds-radius-box {
  width: 100%;
  aspect-ratio: 3 / 2;
  background: var(--color-azul-100);
  border: 1.5px solid var(--color-azul-300);
}
.ds-radius-item code { font-size: 0.75rem; color: var(--color-azul-700); font-family: ui-monospace, monospace; }
.ds-radius-item small { font-size: 0.72rem; color: var(--color-muted); }

/* ─── Elevación ─── */
.ds-shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
}
.ds-shadow-item { display: flex; flex-direction: column; gap: 0.875rem; align-items: center; }
.ds-shadow-box {
  width: 100%;
  aspect-ratio: 1;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
}
.ds-shadow-item code { font-size: 0.75rem; color: var(--color-azul-700); font-family: ui-monospace, monospace; }

/* ─── Componentes ─── */
.ds-component-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  align-items: center;
  margin-bottom: 1.5rem;
}
.ds-spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.ds-spec-table th, .ds-spec-table td {
  padding: 0.7rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-neutral-200);
}
.ds-spec-table th {
  font-weight: 600;
  color: var(--color-azul-900);
  background: var(--color-neutral-100);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.ds-spec-table td { color: var(--color-on-surface-variant); }
.ds-spec-table td:first-child { font-weight: 600; color: var(--color-azul-900); }
.ds-spec-table tr:last-child td { border-bottom: none; }

.ds-card-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1rem;
}
.ds-card-sample { display: flex; flex-direction: column; }
.ds-card-media {
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, var(--color-azul-900), var(--color-azul-600));
}
.ds-card-body { padding: 1.25rem 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.625rem; }
.ds-card-title { font-size: 1rem; font-weight: 700; color: var(--color-azul-900); margin: 0; }
.ds-card-text { font-size: 0.85rem; line-height: 1.55; color: var(--color-on-surface-variant); margin: 0; }

.ds-two-col {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 640px) { .ds-two-col { grid-template-columns: 1fr 1fr; } }
.ds-input-demo { display: flex; flex-direction: column; gap: 0.75rem; max-width: 320px; }

/* ─── Movimiento ─── */
.ds-motion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.ds-motion-item {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.25rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
.ds-motion-item:hover .ds-motion-dot { transform: translateX(calc(100% - 1.25rem)); }
.ds-motion-track {
  height: 1.25rem;
  background: var(--color-neutral-100);
  border-radius: var(--radius-full);
  position: relative;
  overflow: hidden;
}
.ds-motion-dot {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-full);
  background: var(--color-azul-900);
  transform: translateX(0);
}
.ds-motion-item code { font-size: 0.75rem; color: var(--color-azul-700); font-family: ui-monospace, monospace; }
.ds-motion-item small { font-size: 0.7rem; color: var(--color-muted); }
.ds-duration-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

/* ─── Footer ─── */
.ds-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-outline-variant);
}
.ds-footer p { font-size: 0.8rem; color: var(--color-muted); margin: 0; }

/* ─── Toast ─── */
.ds-toast {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-azul-900);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  z-index: 1000;
  font-family: ui-monospace, monospace;
}
.toast-enter-active, .toast-leave-active { transition: all 300ms var(--ease-expo); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(0.5rem); }
</style>
