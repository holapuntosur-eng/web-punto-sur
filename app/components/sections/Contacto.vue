<template>
  <section
    id="contacto"
    class="section-contacto"
    aria-label="Contacto"
  >
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
          <form
            class="contacto-form"
            @submit.prevent="submitForm"
          >
            <div class="form-row">
              <div class="form-group">
                <label
                  for="nombre"
                  class="form-label"
                >Nombre</label>
                <input
                  id="nombre"
                  v-model="form.nombre"
                  type="text"
                  class="input-ps"
                  placeholder="Tu nombre"
                  required
                  autocomplete="name"
                >
              </div>
              <div class="form-group">
                <label
                  for="email"
                  class="form-label"
                >Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="input-ps"
                  placeholder="tu@email.com"
                  required
                  autocomplete="email"
                >
              </div>
            </div>
            <div class="form-group">
              <label
                for="marca"
                class="form-label"
              >¿De qué se trata tu proyecto?</label>
              <input
                id="marca"
                v-model="form.marca"
                type="text"
                class="input-ps"
                placeholder="Tu marca o proyecto"
              >
            </div>
            <div class="form-group">
              <label
                for="mensaje"
                class="form-label"
              >Mensaje</label>
              <textarea
                id="mensaje"
                v-model="form.mensaje"
                class="input-ps"
                placeholder="Contanos en qué podemos ayudarte..."
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary form-submit"
              :disabled="enviando"
            >
              <span v-if="!enviando">Enviar mensaje</span>
              <span v-else>Enviando...</span>
              <span
                v-if="!enviando"
                class="btn-arrow"
              >
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
            </button>

            <Transition name="fade">
              <p
                v-if="enviado"
                class="form-success"
                role="status"
                aria-live="polite"
              >
                Mensaje enviado. Te respondemos muy pronto.
              </p>
            </Transition>

            <Transition name="fade">
              <p
                v-if="error"
                class="form-error"
                role="alert"
              >
                No pudimos enviar el mensaje. Probá nuevamente o escribinos por email.
              </p>
            </Transition>
          </form>
        </div>

        <!-- Info -->
        <div class="contacto-info reveal reveal-delay-2">
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">
              Email
            </p>
            <a
              href="mailto:hola.puntosur@gmail.com"
              class="contacto-info-val link-ps"
            >
              hola.puntosur@gmail.com
            </a>
          </div>
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">
              Instagram
            </p>
            <a
              href="https://instagram.com/somos_puntosur"
              target="_blank"
              rel="noopener"
              class="contacto-info-val link-ps"
            >
              @somos_puntosur
            </a>
          </div>
          <div class="contacto-info-block">
            <p class="text-eyebrow contacto-info-label">
              Ubicación
            </p>
            <p class="contacto-info-val">
              Mar del Plata, Argentina
            </p>
            <p class="contacto-info-sub text-body-sm">
              Alcance global
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const formEndpoint = 'https://formspree.io/f/mbdnjqvr'
const form = reactive({ nombre: '', email: '', marca: '', mensaje: '' })
const enviando = ref(false)
const enviado = ref(false)
const error = ref(false)

async function submitForm() {
  enviando.value = true
  enviado.value = false
  error.value = false

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        proyecto: form.marca,
        mensaje: form.mensaje
      })
    })

    if (!response.ok) {
      throw new Error('Formspree request failed')
    }

    form.nombre = ''
    form.email = ''
    form.marca = ''
    form.mensaje = ''
    enviado.value = true
    setTimeout(() => {
      enviado.value = false
    }, 5000)
  } catch {
    error.value = true
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.section-contacto {
  padding-block: clamp(5rem, 10vw, 9rem);
  background:
    radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--color-celeste-100) 44%, transparent), transparent 22rem),
    linear-gradient(180deg, var(--color-surface), var(--color-background));
  position: relative;
  overflow: hidden;
}

/* Headline */
.contacto-headline {
  margin-bottom: clamp(3rem, 7vw, 6rem);
}
.contacto-title {
  font-size: clamp(3rem, 7.4vw, 7rem);
  font-weight: 500;
  line-height: 0.96;
  letter-spacing: -0.055em;
  color: var(--color-azul-900);
  margin: 0;
  display: flex;
  flex-direction: column;
}
.contacto-title-line2 { padding-left: clamp(2rem, 8vw, 8rem); }
.accent-q { color: inherit; }

/* Grid */
.contacto-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
}
@media (min-width: 768px) {
  .contacto-grid { grid-template-columns: 1.35fr 0.9fr; gap: clamp(3rem, 7vw, 6rem); }
}

.contacto-form-wrap {
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(1.75rem, 4vw, 3rem);
  background: rgba(255,255,255,0.72);
  box-shadow: 0 1.5rem 4.5rem rgba(0, 33, 60, 0.08);
  backdrop-filter: blur(14px);
  transition:
    border-color var(--duration-base) ease,
    box-shadow var(--duration-base) var(--ease-expo),
    transform var(--duration-base) var(--ease-expo);
}

.contacto-form-wrap:focus-within {
  border-color: color-mix(in srgb, var(--color-azul-700) 30%, transparent);
  box-shadow: 0 2rem 5.5rem rgba(0, 33, 60, 0.12);
  transform: translateY(-4px);
}

/* Formulario */
.contacto-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

.form-error {
  font-size: 0.875rem;
  font-weight: 600;
  color: #b42318;
  background: #fff4f2;
  padding: 0.875rem 1.25rem;
  border-radius: var(--radius-full);
  margin: 0;
}

/* Info */
.contacto-info {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding-top: 0;
}
.contacto-info-block {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 8%, transparent);
  border-radius: clamp(1.35rem, 3vw, 2rem);
  background: rgba(255,255,255,0.58);
  transition:
    background var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo);
}
.contacto-info-block:hover {
  background: rgba(255,255,255,0.8);
  transform: translateY(-4px);
}
.contacto-info-label { margin: 0; }
.contacto-info-val {
  font-size: clamp(1rem, 1.8vw, 1.28rem);
  font-weight: 600;
  color: var(--color-azul-900);
  text-decoration: none;
  letter-spacing: -0.03em;
}
a.contacto-info-val:hover { color: var(--color-azul-600); }
.contacto-info-sub { color: var(--color-on-surface-variant); margin: 0; }

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 400ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
