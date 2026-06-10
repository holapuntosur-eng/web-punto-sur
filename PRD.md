# PRD — Punto Sur Web
**Versión:** 1.0  
**Fecha:** Junio 2026  
**Autoras:** Jonatan & Ana — Punto Sur

---

## 1. Visión del producto

Sitio web institucional y portfolio para **Punto Sur**, estudio creativo audiovisual y de diseño con base en Mar del Plata y alcance global. El sitio debe comunicar autoridad creativa, generar confianza en potenciales clientes y funcionar como la principal herramienta de captación de nuevos proyectos.

**Posicionamiento:** Un estudio pequeño con estándares internacionales. La web debe transmitir exactamente eso: criterio, carácter y calidad de agencia global — desde el sur.

---

## 2. Objetivos

| Objetivo | Métrica de éxito |
|---|---|
| Generar consultas de nuevos clientes | ≥ 5 contactos/mes en los primeros 3 meses |
| Transmitir autoridad y confianza | Tiempo en página > 2 min promedio |
| Mostrar el portfolio de manera efectiva | Tasa de clics en proyectos > 30% |
| Posicionar la marca en SEO local y de nicho | Aparecer en búsquedas de "estudio creativo Mar del Plata" |

---

## 3. Audiencia

### Perfil principal — Decisor de marca
- Dueño de empresa, gerente de marketing o director creativo
- Busca un socio estratégico, no solo un proveedor
- Valora el criterio y la experiencia internacional
- Presupuesto medio-alto

### Perfil secundario — Colaborador o agencia
- Busca freelancers o estudios para subcontratar
- Necesita ver calidad de trabajo rápido
- Valora la especialización (IA, audiovisual, UX/UI)

---

## 4. Páginas y estructura

```
/                    → Home (one-page con anchors)
/proyectos           → Portfolio completo
/proyectos/[slug]    → Caso individual
/contacto            → Formulario de contacto
```

### Secciones del Home (en orden de scroll)

| # | Sección | Objetivo |
|---|---|---|
| 01 | **Hero** | Impacto inmediato. Capturar la atención en 3 segundos |
| 02 | **Sobre Punto Sur** | Establecer quiénes son y su perspectiva única |
| 03 | **Quiénes somos** | Humanizar la marca. Jonatan & Ana, trayectoria |
| 04 | **Servicios** | Dejar claro qué hacen y cómo |
| 05 | **Portfolio** | Prueba social. Proyectos destacados |
| 06 | **Contacto / CTA final** | Conversión |

---

## 5. Funcionalidades

### MVP (v1.0)
- [ ] Navegación sticky con scroll suave entre secciones
- [ ] Hero con animación de entrada (texto reveal + cursor personalizado)
- [ ] Sección About con parallax o scroll reveal
- [ ] Grid de servicios con hover interactivo
- [ ] Portfolio con filtros (tipo: audiovisual / diseño / digital)
- [ ] Cards de proyectos con preview en hover
- [ ] Formulario de contacto funcional (email directo)
- [ ] Footer con links sociales
- [ ] Responsive completo (mobile-first)
- [ ] Transiciones de página suaves

### Post-MVP (v2.0)
- [ ] Blog / Insights
- [ ] Modo oscuro
- [ ] Animaciones de cursor personalizado avanzado
- [ ] Casos de estudio expandidos con storytelling visual
- [ ] Integración CMS (para actualizar portfolio sin código)

---

## 6. Referencia de estilo y animaciones

**Referencia principal:** [dhnn.com](https://dhnn.com)

### Principios de animación
- **Scroll reveal:** elementos que aparecen con fade + translate al entrar al viewport
- **Tipografía cinética:** titulares grandes que se revelan línea por línea
- **Texto duplicado / offset:** efecto de profundidad con capas de texto desplazadas (al modo dhnn)
- **Hover states expresivos:** en cards de portfolio, botones y navegación
- **Transiciones entre páginas:** fade suave o slide (con View Transitions API o Nuxt transitions)
- **Cursor personalizado:** punto/círculo que cambia de estado en hover sobre elementos interactivos

### Principios de diseño
- Mucho espacio en blanco — no saturar
- Tipografía como elemento visual, no solo funcional
- Paleta reducida: Azul (#00213C / #153756), Amarillo (#F2DDA0), Celeste (#B8D2E9), blancos y negros
- Fotografía y video como protagonistas en el portfolio
- Elementos pill-shaped para botones y tags

---

## 7. Stack técnico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **Nuxt 3** | Vue 3, SSG/SSR, excelente para portfolios y SEO |
| UI Components | **Nuxt UI v4** | Componentes accesibles + Tailwind CSS |
| Animaciones | **GSAP** + **@vueuse/motion** | Control profesional de animaciones de scroll y timeline |
| Scroll | **Lenis** | Scroll suave tipo agencia premium |
| Tipografía | **Montserrat** (Google Fonts) | Definida en el design system |
| Deploy | **Vercel** o **Netlify** | Free tier suficiente para MVP |
| Formulario | **Resend** o **Formspree** | Email sin backend propio |
| CMS (post-MVP) | **Notion API** o **Sanity** | Actualización fácil de portfolio |

---

## 8. Design Tokens (resumen)

Ver `DESIGN.md` para la especificación completa.

| Token | Valor |
|---|---|
| Primary | `#00213C` |
| Primary Container | `#153756` |
| Secondary (Amarillo) | `#F2DDA0` |
| Tertiary (Celeste) | `#062234` / `#B8D2E9` |
| Background | `#F8F9FA` |
| Font family | Montserrat |
| Container max | 1280px |
| Base spacing | 8px |

---

## 9. SEO y performance

- Meta tags completos en cada página (título, descripción, OG, Twitter Card)
- Sitemap automático con `@nuxtjs/sitemap`
- Imágenes optimizadas con `<NuxtImage>` (formato WebP/AVIF)
- Core Web Vitals objetivo: LCP < 2.5s, CLS < 0.1
- Lazy loading en secciones de portfolio

---

## 10. Plan de trabajo

```
Semana 1  → Setup proyecto + Design System en código (tokens, componentes base)
Semana 2  → Hero + Navegación + About
Semana 3  → Servicios + Portfolio (grid + cards)
Semana 4  → Contacto + Footer + Animaciones
Semana 5  → QA, responsive, performance, deploy
```

---

## 11. Lo que NO entra en v1

- Tienda / e-commerce
- Sistema de pagos
- Área privada de clientes
- Multiidioma (aunque el stack lo soporta para v2)
- Blog dinámico con CMS

---

*"Nuestro sur no es una limitación geográfica. Es una perspectiva: fresca, auténtica y diferente."*
