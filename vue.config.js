const path = require('path')
const jsConfig = require('./jsconfig.json')
const { defineConfig } = require('@vue/cli-service')

const getWebpackAliasFromJSConfig = function getWebpackAliasFromJSConfig(jsConfigPaths = {}, jsConfigBaseUrl = __dirname) {
  const alias = Object.keys(jsConfigPaths)
    .reduce(( currentAlias, pathKey ) => {
      const [aliasKey] = pathKey.split('/')
      const [pathAtJsConfig] = jsConfigPaths[pathKey]

      const [relativePathToDir] = pathAtJsConfig.split('/*')

      const absolutePath = path.resolve(jsConfigBaseUrl, relativePathToDir)

      return {
        ...currentAlias,
        [aliasKey]: absolutePath,
      }
    }, {})

  return alias
}
const alias = getWebpackAliasFromJSConfig(jsConfig.compilerOptions.paths, jsConfig.compilerOptions.baseUrl)

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias
    }
  }
})
