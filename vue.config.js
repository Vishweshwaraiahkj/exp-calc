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
          `
      }
    }
  }
})
