<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  script: [{
    innerHTML: 'document.documentElement.classList.add(\'js\')',
    tagPosition: 'head'
  }],
  htmlAttrs: { lang: 'es' }
})

useSeoMeta({
  title: 'Punto Sur — Estudio Creativo',
  description: 'Estudio creativo audiovisual y de diseño con base en Mar del Plata y alcance global. Creatividad con raíces, impacto sin fronteras.',
  ogTitle: 'Punto Sur — Estudio Creativo',
  ogDescription: 'Creatividad con raíces, impacto sin fronteras.',
  twitterCard: 'summary_large_image'
})

useScrollReveal()
useParallax()
</script>

<template>
  <UApp>
    <a
      href="#contenido"
      class="skip-link"
    >Saltar al contenido</a>
    <UiPsCursor />
    <NuxtPage />
  </UApp>
</template>
