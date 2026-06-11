<template>
  <nav
    class="nav-ps"
    :class="{ scrolled: isScrolled, 'menu-open': menuOpen }"
    aria-label="Navegación principal"
  >
    <div class="container-ps">
      <div class="nav-inner">

        <!-- Logo -->
        <a href="#inicio" class="nav-logo" @click.prevent="scrollTo('inicio')" aria-label="Punto Sur — inicio">
          <UiPsLogo class="nav-logo-svg" />
        </a>

        <!-- Links desktop -->
        <ul class="nav-links" role="list">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="nav-link link-ps"
              :class="{ active: activeSection === item.id }"
              @click.prevent="scrollTo(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- CTA desktop -->
        <a
          href="#contacto"
          class="btn btn-primary nav-cta"
          @click.prevent="scrollTo('contacto')"
        >
          Hablemos
          <span class="btn-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>

        <!-- Hamburger mobile -->
        <button
          class="nav-hamburger"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-controls="menu-mobile"
          :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <!-- Menú mobile -->
    <Transition name="menu">
      <div v-if="menuOpen" id="menu-mobile" class="nav-mobile-menu">
        <ul role="list">
          <li v-for="(item, i) in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              class="nav-mobile-link"
              :style="{ '--i': i }"
              @click.prevent="mobileNav(item.id)"
            >
              <span class="text-eyebrow nav-mobile-num">0{{ i + 1 }}</span>
              {{ item.label }}
            </a>
          </li>
        </ul>
        <a href="#contacto" class="btn btn-primary nav-mobile-cta" @click.prevent="mobileNav('contacto')">
          Hablemos →
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { id: 'nosotros',  label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contacto',  label: 'Contacto' },
]

const isScrolled    = ref(false)
const menuOpen      = ref(false)
const activeSection = ref('inicio')
let observers: IntersectionObserver[] = []

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

function mobileNav(id: string) {
  menuOpen.value = false
  setTimeout(() => scrollTo(id), 100)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu()
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

watch(menuOpen, open => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)

  // Active section con IntersectionObserver
  const sections = ['inicio', 'nosotros', 'servicios', 'portfolio', 'contacto']
  sections.forEach(id => {
    const el = document.getElementById(id)
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) activeSection.value = id
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    observers.push(obs)
  })

})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  observers.forEach(observer => observer.disconnect())
})
</script>

<style scoped>
.nav-inner {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Logo */
.nav-logo {
  text-decoration: none;
  margin-right: auto;
  display: flex;
  align-items: center;
}
.nav-logo-svg { --logo-height: 1.75rem; }
/* Cuando el menú mobile está abierto, logo en blanco sobre el azul */
.nav-ps.menu-open .nav-logo-svg { color: #ffffff; }

/* Links desktop */
.nav-links {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
}
@media (min-width: 768px) {
  .nav-links { display: flex; }
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface-variant);
  text-decoration: none;
  transition: color 200ms ease;
  padding-block: 0.25rem;
}
.nav-link:hover,
.nav-link.active { color: var(--color-azul-900); }

/* CTA */
.nav-cta {
  display: none;
  padding: 0.625rem 1.25rem;
  font-size: 0.8125rem;
}
@media (min-width: 768px) {
  .nav-cta { display: inline-flex; }
}

/* Hamburger */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0.625rem;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin-left: auto;
}
.nav-hamburger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--color-azul-900);
  transition: transform 300ms var(--ease-expo), opacity 200ms ease;
  transform-origin: center;
}
.nav-hamburger.open span { background: #ffffff; }
.nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (min-width: 768px) {
  .nav-hamburger { display: none; }
}

/* Mobile menu */
.nav-mobile-menu {
  position: fixed;
  inset: 0;
  top: 0;
  background: var(--color-azul-900);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem var(--margin-mobile) 3rem;
  gap: 2rem;
}

.nav-mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-mobile-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  padding-block: 0.5rem;
  min-height: 52px;
  transition: color 200ms ease;
}
.nav-mobile-link:hover { color: var(--color-amarillo-300); }

.nav-mobile-num {
  color: var(--color-amarillo-300);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 2rem;
}

.nav-mobile-cta {
  align-self: flex-start;
  background: var(--color-amarillo-300);
  color: var(--color-azul-900);
  font-size: 1rem;
  padding: 0.875rem 2rem;
}

/* Transición menú */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 350ms var(--ease-expo), transform 350ms var(--ease-expo);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
