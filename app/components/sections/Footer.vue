<template>
  <footer class="site-footer" aria-label="Pie de página">
    <div class="container-ps">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#inicio" class="footer-logo">
            Punto Sur<span class="footer-logo-dot">.</span>
          </a>
          <p class="footer-tagline text-body-sm">
            Creatividad con raíces,<br>impacto sin fronteras.
          </p>
        </div>

        <nav class="footer-nav" aria-label="Navegación footer">
          <ul role="list">
            <li v-for="item in navItems" :key="item.id">
              <a :href="`#${item.id}`" class="footer-link link-ps" @click.prevent="scrollTo(item.id)">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="footer-contact">
          <a href="mailto:hola.puntosur@gmail.com" class="footer-link link-ps">hola.puntosur@gmail.com</a>
          <a href="https://instagram.com/somos_puntosur" target="_blank" rel="noopener" class="footer-link link-ps">@somos_puntosur</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy text-body-sm">
          © {{ year }} Punto Sur. Todos los derechos reservados.
        </p>
        <p class="footer-made text-body-sm">
          Mar del Plata, Argentina
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

const navItems = [
  { id: 'nosotros',  label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contacto',  label: 'Contacto' },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}
</script>

<style scoped>
.site-footer {
  background: var(--color-azul-900);
  color: rgba(255,255,255,0.7);
  padding-block: 3.5rem 2rem;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 1.75rem;
}
@media (min-width: 640px) {
  .footer-top { grid-template-columns: 1.5fr 1fr 1fr; }
}

.footer-logo {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 0.875rem;
}
.footer-logo-dot { color: var(--color-amarillo-300); }
.footer-tagline { color: rgba(255,255,255,0.45); line-height: 1.6; }

.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-link {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}
.footer-link:hover { color: #ffffff; }
/* Sobreescribir el subrayado link-ps en footer */
.footer-link::after { background: #ffffff; }

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.footer-copy,
.footer-made { color: rgba(255,255,255,0.35); margin: 0; }
</style>
