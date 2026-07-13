<template>
  <section
    id="reel"
    class="section-reel"
    aria-label="Reel"
  >
    <div class="container-ps reel-shell">
      <div
        ref="stageRef"
        class="reel-stage reveal reveal-delay-1"
        data-parallax-speed="0.08"
        data-parallax-scale
      >
        <video
          ref="desktopVideoRef"
          class="reel-video reel-video--desktop"
          src="/videos/ps-web-reel-2026-16x9.webm"
          autoplay
          :muted="isMuted"
          loop
          playsinline
          preload="metadata"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @volumechange="syncMuteState"
        />
        <video
          ref="mobileVideoRef"
          class="reel-video reel-video--mobile"
          src="/videos/ps-web-reel-2026-3x4.webm"
          autoplay
          :muted="isMuted"
          loop
          playsinline
          preload="metadata"
          @play="isPlaying = true"
          @pause="isPlaying = false"
          @volumechange="syncMuteState"
        />
        <div
          class="reel-controls"
          aria-label="Controles del reel"
        >
          <button
            class="reel-control"
            type="button"
            :aria-label="isPlaying ? 'Pausar reel' : 'Reproducir reel'"
            @click="togglePlay"
          >
            <svg
              v-if="isPlaying"
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 5.75V18.25M16 5.75V18.25"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8.25 5.75V18.25L18.25 12L8.25 5.75Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="reel-control"
            type="button"
            :aria-label="isMuted ? 'Activar sonido' : 'Silenciar reel'"
            @click="toggleMute"
          >
            <svg
              v-if="isMuted"
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9.5V14.5H7.5L13 19V5L7.5 9.5H4Z"
                stroke="currentColor"
                stroke-width="1.85"
                stroke-linejoin="round"
              />
              <path
                d="M17 9L21 13M21 9L17 13"
                stroke="currentColor"
                stroke-width="1.85"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9.5V14.5H7.5L13 19V5L7.5 9.5H4Z"
                stroke="currentColor"
                stroke-width="1.85"
                stroke-linejoin="round"
              />
              <path
                d="M16.75 8.25C17.85 9.2 18.5 10.53 18.5 12C18.5 13.47 17.85 14.8 16.75 15.75"
                stroke="currentColor"
                stroke-width="1.85"
                stroke-linecap="round"
              />
              <path
                d="M19 5.75C20.86 7.26 22 9.51 22 12C22 14.49 20.86 16.74 19 18.25"
                stroke="currentColor"
                stroke-width="1.85"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <button
            class="reel-control reel-control--wide"
            type="button"
            :aria-label="isFullscreen ? 'Minimizar video' : 'Maximizar video'"
            @click="toggleFullscreen"
          >
            <svg
              v-if="isFullscreen"
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 4V9H4M15 4V9H20M9 20V15H4M15 20V15H20"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else
              class="reel-control-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 9V4H9M20 9V4H15M4 15V20H9M20 15V20H15"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stageRef = ref<HTMLElement | null>(null)
const desktopVideoRef = ref<HTMLVideoElement | null>(null)
const mobileVideoRef = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
const isPlaying = ref(true)
const isFullscreen = ref(false)

function getActiveVideo() {
  if (import.meta.client && window.matchMedia('(max-width: 640px)').matches) {
    return mobileVideoRef.value
  }

  return desktopVideoRef.value
}

function syncVideoAudio() {
  const videos = [desktopVideoRef.value, mobileVideoRef.value].filter(Boolean)
  videos.forEach((video) => {
    if (!video) return
    video.muted = isMuted.value
    video.volume = isMuted.value ? 0 : 1
  })
}

function syncMuteState(event: Event) {
  const video = event.currentTarget
  if (video instanceof HTMLVideoElement) {
    isMuted.value = video.muted || video.volume === 0
  }
}

async function togglePlay() {
  const video = getActiveVideo()
  if (!video) return

  if (video.paused) {
    await video.play().catch(() => {})
    isPlaying.value = !video.paused
    return
  }

  video.pause()
  isPlaying.value = false
}

async function toggleMute() {
  isMuted.value = !isMuted.value
  syncVideoAudio()

  const video = getActiveVideo()
  if (video?.paused) {
    await video.play().catch(() => {})
  }
}

async function toggleFullscreen() {
  const target = stageRef.value
  const video = getActiveVideo()

  if (document.fullscreenElement) {
    await document.exitFullscreen().catch(() => {})
    return
  }

  if (target?.requestFullscreen) {
    await target.requestFullscreen().catch(() => {})
    return
  }

  const webkitVideo = video as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
  webkitVideo?.webkitEnterFullscreen?.()
}

function onFullscreenChange() {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

onMounted(() => {
  syncVideoAudio()
  document.addEventListener('fullscreenchange', onFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})
</script>

<style scoped>
.section-reel {
  padding-block: clamp(0.75rem, 3vw, 2.75rem) clamp(4rem, 9vw, 8rem);
  background:
    radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--color-amarillo-100) 66%, transparent), transparent 22rem),
    var(--color-background);
}

.reel-shell {
  position: relative;
}

.reel-stage {
  position: relative;
  min-height: clamp(18rem, 48vw, 42rem);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-azul-900) 10%, transparent);
  border-radius: clamp(1.5rem, 3vw, 2.4rem);
  background:
    linear-gradient(135deg, rgba(255,255,255,0.62), rgba(255,255,255,0.24)),
    linear-gradient(145deg, #d8dde3 0%, #aeb8c2 100%);
  box-shadow: 0 2.5rem 7rem rgba(0, 33, 60, 0.12);
  transform-origin: center;
  cursor: auto !important;
}

.reel-stage * {
  cursor: auto !important;
}

.reel-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 33, 60, 0.08), transparent 28%, rgba(0, 33, 60, 0.2));
  pointer-events: none;
}

.reel-stage:fullscreen {
  width: 100vw;
  height: 100vh;
  aspect-ratio: auto;
  border-radius: 0;
  background: #000000;
  cursor: auto !important;
}

.reel-stage:fullscreen .reel-video {
  object-fit: contain;
}

.reel-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reel-controls {
  position: absolute;
  left: clamp(0.85rem, 2vw, 1.35rem);
  right: clamp(0.85rem, 2vw, 1.35rem);
  bottom: clamp(0.85rem, 2vw, 1.35rem);
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  pointer-events: auto;
}

.reel-control {
  appearance: none;
  border: 1px solid rgba(255,255,255,0.36);
  border-radius: var(--radius-full);
  background: rgba(0, 17, 31, 0.52);
  color: #ffffff;
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  min-height: 2.75rem;
  place-items: center;
  padding: 0;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: pointer !important;
  transition:
    background var(--duration-base) ease,
    border-color var(--duration-base) ease,
    transform var(--duration-base) var(--ease-expo);
}

.reel-stage:fullscreen .reel-controls {
  position: fixed;
  left: 50%;
  right: auto;
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  width: min(24rem, calc(100vw - 2rem));
  justify-content: center;
  transform: translateX(-50%);
  z-index: 2147483647;
}

.reel-control-icon {
  width: 1.12rem;
  height: 1.12rem;
}

.reel-control:hover {
  border-color: rgba(255,255,255,0.72);
  background: rgba(0, 17, 31, 0.76);
  transform: translateY(-2px);
}

.reel-control--wide {
  width: 2.75rem;
  margin-left: auto;
}

.reel-video--mobile {
  display: none;
}

@media (max-width: 640px) {
  .section-reel {
    padding-block-start: 0.5rem;
  }

  .reel-stage {
    min-height: auto;
    aspect-ratio: 3 / 4;
  }

  .reel-video--desktop {
    display: none;
  }

  .reel-video--mobile {
    display: block;
  }

  .reel-controls {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .reel-control {
    width: 2.5rem;
    height: 2.5rem;
    min-height: 2.5rem;
  }

  .reel-control--wide {
    margin-left: 0;
  }
}
</style>
