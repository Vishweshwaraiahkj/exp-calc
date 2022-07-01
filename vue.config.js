const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  assetsDir: 'src/assets',
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false
        },
        additionalData: `
            @import "src/assets/styles/_variables.scss";
            @import "src/assets/styles/_global.scss";
          `
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: false,
        os: false
      }
    }
  }
})
