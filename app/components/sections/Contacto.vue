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
            <div class="contacto-info-heading">
              <span
                class="contacto-info-icon"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.75 6.75h14.5v10.5H4.75z"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linejoin="round"
                  />
                  <path
                    d="m5.25 7.25 6.75 5.5 6.75-5.5"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <p class="text-eyebrow contacto-info-label">
                Email
              </p>
            </div>
            <a
              href="mailto:hola.puntosur@gmail.com"
              class="contacto-info-val link-ps"
            >
              hola.puntosur@gmail.com
            </a>
          </div>
          <div class="contacto-info-block">
            <div class="contacto-info-heading">
              <span
                class="contacto-info-icon"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="4"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.25"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <circle
                    cx="16.25"
                    cy="7.75"
                    r="0.8"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <p class="text-eyebrow contacto-info-label">
                Instagram
              </p>
            </div>
            <a
              href="https://instagram.com/somos_puntosur"
              target="_blank"
              rel="noopener"
              class="contacto-info-val link-ps"
            >
              @somos_puntosur
            </a>
          </div>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="contacto-info-block contacto-whatsapp"
          >
            <span class="contacto-whatsapp-copy">
              <span class="contacto-info-heading">
                <span
                  class="contacto-info-icon"
                  aria-hidden="true"
                >
                  <svg
                    class="contacto-info-icon-svg contacto-info-icon-svg--whatsapp"
                    width="18"
                    height="18"
                    viewBox="0 0 170.491 170.909"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 170.909l12.254-45.718c-6.938-12.517-10.588-26.543-10.588-40.779C1.665 37.869 39.533 0 86.077 0s84.414 37.869 84.414 84.413-37.868 84.414-84.414 84.414c-13.972 0-27.773-3.528-40.125-10.228L0 170.909Zm48.238-29.442 2.893 1.726c10.623 6.33 22.709 9.678 34.946 9.678 37.747 0 68.458-30.709 68.458-68.458s-30.711-68.457-68.458-68.457-68.456 30.708-68.456 68.457c0 12.464 3.462 24.737 10.012 35.493l1.775 2.915-6.84 25.524 25.67-6.879Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M117.479 96.153c-3.475-2.079-7.994-4.398-12.088-2.724-3.141 1.284-5.146 6.2-7.181 8.71-1.044 1.289-2.289 1.49-3.893.845-11.789-4.695-20.821-12.565-27.325-23.407-1.102-1.686-.904-3.014.424-4.576 1.965-2.313 4.432-4.941 4.964-8.059.531-3.117-.932-6.762-2.22-9.539-1.648-3.548-3.488-8.607-7.042-10.614-3.268-1.845-7.57-.812-10.479 1.559-5.024 4.09-7.448 10.5-7.374 16.854.02 1.805.242 3.606.663 5.347 1.014 4.191 2.951 8.103 5.131 11.824 1.643 2.805 3.429 5.527 5.357 8.146 6.304 8.565 14.149 16.007 23.23 21.57 4.538 2.779 9.426 5.216 14.488 6.889 5.676 1.876 10.734 3.827 16.864 2.663 6.417-1.218 12.745-5.19 15.293-11.375.753-1.831 1.13-3.87.708-5.804-.872-3.999-6.284-6.375-9.519-8.309Z"
                    />
                  </svg>
                </span>
                <span class="text-eyebrow contacto-info-label">
                  WhatsApp
                </span>
              </span>
              <span class="contacto-info-val">
                Escaneá y escribinos
              </span>
              <span class="contacto-info-sub text-body-sm">
                Respuesta directa para nuevos proyectos.
              </span>
            </span>
            <span
              class="contacto-qr"
              aria-hidden="true"
            >
              <img
                :src="whatsappQrSrc"
                alt=""
                loading="lazy"
              >
            </span>
          </a>
          <div class="contacto-info-block">
            <div class="contacto-info-heading">
              <span
                class="contacto-info-icon"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 20.25s6-5.42 6-10.25a6 6 0 0 0-12 0c0 4.83 6 10.25 6 10.25Z"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.2"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                </svg>
              </span>
              <p class="text-eyebrow contacto-info-label">
                Ubicación
              </p>
            </div>
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
const whatsappHref = 'https://wa.me/5491131660452?text=Hola%20Punto%20Sur%2C%20quiero%20hablar%20sobre%20un%20proyecto.'
const whatsappQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(whatsappHref)}`
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
.contacto-whatsapp {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  color: inherit;
  text-decoration: none;
}
.contacto-whatsapp-copy {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.contacto-info-heading {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
}
.contacto-info-icon {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 10%, transparent);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-celeste-100) 42%, white);
  color: var(--color-azul-700);
  transition:
    background var(--duration-base) ease,
    color var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo);
}
.contacto-info-block:hover .contacto-info-icon {
  background: var(--color-azul-900);
  color: #ffffff;
  transform: translateY(-1px);
}
.contacto-info-icon-svg {
  width: 1.125rem;
  height: 1.125rem;
}
.contacto-info-icon-svg--whatsapp {
  width: 0.98rem;
  height: 0.98rem;
}
.contacto-qr {
  display: grid;
  width: clamp(5.4rem, 9vw, 7rem);
  aspect-ratio: 1;
  place-items: center;
  padding: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 10%, transparent);
  border-radius: 1.1rem;
  background: rgba(255,255,255,0.82);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.6);
}
.contacto-qr img {
  display: block;
  width: 100%;
  height: 100%;
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

@media (max-width: 479px) {
  .contacto-whatsapp {
    grid-template-columns: 1fr;
  }

  .contacto-qr {
    width: 7rem;
  }
}

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity 400ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
