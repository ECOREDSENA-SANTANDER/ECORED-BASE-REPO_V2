// Forzar helpers CommonJS de Babel (evita "exports is not defined" en el navegador)
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = 'true'

const path = require('path')
const titulo = require('./src/config/titulo')
// Vue CLI 5 / Webpack 5. Sass: additionalData; css.url para no resolver /fonts/
module.exports = {
  publicPath: '',
  parallel: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/styles/_variables.sass" as *`,
        // Opcional: quitar silenceDeprecations tras migración completa
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
        },
      },
      css: {
        // No resolver URLs absolutas (/fonts/...) para que no falle el build
        url: { filter: (url) => !url.startsWith('/') },
      },
    },
  },
  chainWebpack: (config) => {
    // Forzar helpers CommonJS de Babel (evita "exports is not defined")
    config.resolve.alias.set(
      '@babel/runtime/helpers/esm',
      path.join(__dirname, 'node_modules/@babel/runtime/helpers'),
    )
    config.plugin('html').tap((args) => {
      args[0].title = titulo
      return args
    })
  },
}
