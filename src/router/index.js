import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from '@ecored-sena/boulder-kit/plugin/components/Inicio.vue'
import Curso from '@ecored-sena/boulder-kit/plugin/components/plantilla/Curso.vue'
import Glosario from '@ecored-sena/boulder-kit/plugin/components/Glosario.vue'
import Referencias from '@ecored-sena/boulder-kit/plugin/components/Referencias.vue'
import Creditos from '@ecored-sena/boulder-kit/plugin/components/Creditos.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
    },
    {
      path: '/introduccion',
      name: 'introduccion',
      component: () =>
        import(/* webpackChunkName: "intro" */ '../views/Introduccion.vue'),
    },
    {
      path: '/curso',
      name: 'curso',
      component: Curso,
      redirect: {
        name: 'tema1',
      },
      children: [
        {
          path: 'tema1',
          name: 'tema1',
          component: () =>
            import(/* webpackChunkName: "tema1" */ '../views/Tema1.vue'),
        },
        {
          path: 'tema2',
          name: 'tema2',
          component: () =>
            import(/* webpackChunkName: "tema2" */ '../views/Tema2.vue'),
        },
        {
          path: 'tema3',
          name: 'tema3',
          component: () =>
            import(/* webpackChunkName: "tema3" */ '../views/Tema3.vue'),
        },
      ],
    },
    {
      path: '/actividad',
      name: 'actividad',
      component: () =>
        import(/* webpackChunkName: "actividad" */ '../views/Actividad.vue'),
    },
    {
      path: '/glosario',
      name: 'glosario',
      component: Glosario,
    },
    {
      path: '/referencias',
      name: 'referencias',
      component: Referencias,
    },
    {
      path: '/sintesis',
      name: 'sintesis',
      component: () =>
        import(/* webpackChunkName: "sintesis" */ '../views/Sintesis.vue'),
    },
    {
      path: '/creditos',
      name: 'creditos',
      component: Creditos,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const HEADER_OFFSET = 100

      return new Promise((resolve) => {
        let timer = null
        const performScroll = () => {
          cleanup()

          let targetEl = null
          try {
            targetEl = document.querySelector(to.hash)
          } catch (_) {
            targetEl = document.getElementById(to.hash.replace('#', ''))
          }

          if (!targetEl) {
            return resolve({ top: 0 })
          }

          const top =
            targetEl.getBoundingClientRect().top +
            window.scrollY -
            HEADER_OFFSET
          resolve({ top, behavior: 'smooth' })
        }

        const cleanup = () => {
          if (observer) observer.disconnect()
          if (timer) clearTimeout(timer)
        }

        const observer = new ResizeObserver(() => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(performScroll, 60)
        })

        observer.observe(document.body)
        setTimeout(() => {
          cleanup()
          performScroll()
        }, 500)
      })
    }

    return { top: 0 }
  },
})

export default router
