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
            @import "src/assets/styles/fonts";
            @import "src/assets/styles/variables";
            @import "src/assets/styles/keyframes";
            @import "src/assets/styles/mixins";
          `
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: 'src/preload.js',
      builderOptions: {
        productName: 'Master Utils',
        appId: 'master-utils',
        win: {
          target: ['nsis'],
          icon: 'public/favicon.ico'
        },
        nsis: {
          installerIcon: 'public/favicon.ico',
          uninstallerIcon: 'public/favicon.ico',
          oneClick: false
        },
        extraResources: ['src/assets/icons/**']
      },
      chainWebpackRendererProcess(config) {
        config.plugins.delete('workbox')
        config.plugins.delete('pwa')
      }
    }
  }
})
