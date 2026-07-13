<template>
  <section
    id="reel"
    class="section-reel"
    aria-label="Reel"
  >
    <div class="container-ps reel-shell">
      <div
        class="reel-stage reveal reveal-delay-1"
        data-parallax-speed="0.08"
        data-parallax-scale
      >
        <video
          class="reel-video reel-video--desktop"
          src="/videos/ps-web-reel-2026-16x9.webm"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        />
        <video
          class="reel-video reel-video--mobile"
          src="/videos/ps-web-reel-2026-3x4.webm"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-reel {
  padding-block: clamp(2.5rem, 7vw, 6rem) clamp(4rem, 9vw, 8rem);
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
}

.reel-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 33, 60, 0.08), transparent 28%, rgba(0, 33, 60, 0.2));
  pointer-events: none;
}

.reel-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reel-video--mobile {
  display: none;
}

@media (max-width: 640px) {
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
}
</style>
