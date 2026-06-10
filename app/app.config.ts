export default defineAppConfig({
  ui: {
    colors: {
      primary: 'azul',
      secondary: 'amarillo',
      neutral: 'neutral'
    },
    button: {
      slots: {
        base: 'rounded-full font-semibold tracking-wide cursor-none transition-all duration-200'
      }
    },
    card: {
      slots: {
        root: 'rounded-3xl'
      }
    },
    input: {
      slots: {
        base: 'rounded-full'
      }
    },
    badge: {
      slots: {
        base: 'rounded-full'
      }
    }
  }
})
