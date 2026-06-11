<template>
  <section id="contacto" class="section-contacto" aria-label="Contacto">
    <div class="container-ps">

      <!-- Headline -->
      <div class="contacto-headline">
        <h2 class="contacto-title">
          <span class="split-line"><span class="split-line-inner">Llegaste al sur.</span></span>
          <span class="split-line contacto-title-line2">
            <span class="split-line-inner">¿Empezamos<span class="accent-q">?</span></span>
          </span>
        </h2>
      </div>

      <div class="contacto-grid">
        <!-- Formulario -->
        <div class="contacto-form-wrap reveal">
          <form class="contacto-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  id="nombre"
                  v-model="form.nombre"
                  type="text"
                  class="input-ps"
                  placeholder="Tu nombre"
                  required
                  autocomplete="name"
                />
              </div>
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="input-ps"
                  placeholder="tu@email.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="marca" class="form-label">¿De qué se trata tu proyecto?</label>
              <input
                id="marca"
                v-model="form.marca"
                type="text"
                class="input-ps"
                placeholder="Tu marca o proyecto"
              />
            </div>
            <div class="form-group">
              <label for="mensaje" class="form-label">Mensaje</label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                class="input-ps"
                placeholder="Contanos en qué podemos ayudarte..."
                rows="4"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary form-submit" :disabled="enviando">
              <span v-if="!enviando">Enviar mensaje</span>
              <span v-else>Preparando email...</span>
              <span class="btn-arrow" v-if="!enviando">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>

            <Transition name="fade">
              <p v-if="enviado" class="form-success" role="status" aria-live="polite">
                Se abrió tu aplicación de correo con el mensaje preparado.
              </p>
            </Transition>
          </form>
        </div>

        <!-- Info -->
        <div class="contacto-info reveal reveal-delay-2">
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">Email</p>
            <a href="mailto:hola.puntosur@gmail.com" class="contacto-info-val link-ps">
              hola.puntosur@gmail.com
            </a>
          </div>
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">Instagram</p>
            <a href="https://instagram.com/somos_puntosur" target="_blank" rel="noopener" class="contacto-info-val link-ps">
              @somos_puntosur
            </a>
          </div>
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">Ubicación</p>
            <p class="contacto-info-val">Mar del Plata, Argentina</p>
            <p class="contacto-info-sub text-body-sm">Alcance global</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = reactive({ nombre: '', email: '', marca: '', mensaje: '' })
const enviando = ref(false)
const enviado  = ref(false)

async function submitForm() {
  enviando.value = true
  const subject = encodeURIComponent(`Consulta de ${form.nombre}${form.marca ? ` — ${form.marca}` : ''}`)
  const body = encodeURIComponent([
    `Nombre: ${form.nombre}`,
    `Email: ${form.email}`,
    form.marca ? `Proyecto: ${form.marca}` : '',
    '',
    form.mensaje
  ].filter(Boolean).join('\n'))

  window.location.href = `mailto:hola.puntosur@gmail.com?subject=${subject}&body=${body}`
  await new Promise(resolve => setTimeout(resolve, 300))
  enviando.value = false
  enviado.value  = true
  setTimeout(() => { enviado.value = false }, 5000)
}
</script>

<style scoped>
.section-contacto {
  padding-block: clamp(5rem, 10vw, 9rem);
  background: var(--color-surface);
}

/* Headline */
.contacto-headline {
  margin-bottom: clamp(3rem, 7vw, 6rem);
}
.contacto-title {
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: var(--color-azul-900);
  margin: 0;
  display: flex;
  flex-direction: column;
}
.contacto-title-line2 { padding-left: clamp(2rem, 8vw, 8rem); }
.accent-q { color: var(--color-amarillo-500); }

/* Grid */
.contacto-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
@media (min-width: 768px) {
  .contacto-grid { grid-template-columns: 1.4fr 1fr; gap: 5rem; align-items: start; }
}

/* Formulario */
.contacto-form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.125rem;
}
@media (min-width: 480px) {
  .form-row { grid-template-columns: 1fr 1fr; }
}
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.02em;
}

.form-submit {
  align-self: flex-start;
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  padding: 0.875rem 2rem;
}
.form-submit:disabled { opacity: 0.65; }

.form-success {
  font-size: 0.875rem;
  font-weight: 600;
  color: #16a34a;
  background: #f0fdf4;
  padding: 0.875rem 1.25rem;
  border-radius: var(--radius-full);
  margin: 0;
}

/* Info */
.contacto-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 0.5rem;
}
.contacto-info-block { display: flex; flex-direction: column; gap: 0.4rem; }
.contacto-info-label { margin: 0; }
.contacto-info-val {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-azul-900);
  text-decoration: none;
}
a.contacto-info-val:hover { color: var(--color-azul-600); }
.contacto-info-sub { color: var(--color-on-surface-variant); margin: 0; }

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 400ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
