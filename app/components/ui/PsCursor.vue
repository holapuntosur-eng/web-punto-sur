<template>
  <div v-if="isDesktop">
    <div
      ref="dot"
      class="cursor-dot"
      :style="dotStyle"
    />
    <div
      ref="circle"
      class="cursor-circle"
      :class="{ 'cursor-circle--hover': isHovering, 'cursor-circle--click': isClicking }"
      :style="circleStyle"
    />
  </div>
</template>

<script setup lang="ts">
const dot = ref<HTMLElement>()
const circle = ref<HTMLElement>()

const mouseX = ref(0)
const mouseY = ref(0)
const circleX = ref(0)
const circleY = ref(0)
const isHovering = ref(false)
const isClicking = ref(false)

const isDesktop = ref(false)

const dotStyle = computed(() => ({
  transform: `translate(${mouseX.value}px, ${mouseY.value}px) translate(-50%, -50%)`
}))

const circleStyle = computed(() => ({
  transform: `translate(${circleX.value}px, ${circleY.value}px) translate(-50%, -50%)`
}))

let rafId: number

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function animate() {
  circleX.value = lerp(circleX.value, mouseX.value, 0.12)
  circleY.value = lerp(circleY.value, mouseY.value, 0.12)
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  // Solo en dispositivos con puntero preciso (mouse)
  isDesktop.value = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
  if (!isDesktop.value) return

  mouseX.value = window.innerWidth / 2
  mouseY.value = window.innerHeight / 2
  circleX.value = mouseX.value
  circleY.value = mouseY.value

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mousedown', () => {
    isClicking.value = true
  })
  window.addEventListener('mouseup', () => {
    isClicking.value = false
  })

  // Detectar hover sobre interactivos
  document.addEventListener('mouseover', onMouseOver)
  document.addEventListener('mouseout', onMouseOut)

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
})

function onMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

function onMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('a, button, [role="button"], input, textarea, select, label, .btn, .card')) {
    isHovering.value = true
  }
}

function onMouseOut(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('a, button, [role="button"], input, textarea, select, label, .btn, .card')) {
    isHovering.value = false
  }
}
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--color-azul-900);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transition: width 250ms var(--ease-expo), height 250ms var(--ease-expo);
}

.cursor-circle {
  position: fixed;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  border: 1.5px solid var(--color-azul-700);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
  opacity: 0.5;
  transition:
    width 400ms var(--ease-expo),
    height 400ms var(--ease-expo),
    opacity 300ms ease,
    border-color 300ms ease,
    background 300ms ease;
}

.cursor-circle--hover {
  width: 60px;
  height: 60px;
  opacity: 0.25;
  border-color: var(--color-azul-500);
  background: color-mix(in srgb, var(--color-amarillo-300) 15%, transparent);
}

.cursor-circle--click {
  width: 28px;
  height: 28px;
  opacity: 0.8;
  background: color-mix(in srgb, var(--color-azul-900) 20%, transparent);
  transition-duration: 100ms;
}
</style>
