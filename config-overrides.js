 const { override, fixBabelImports,addDecoratorsLegacy } = require('customize-cra');
 const path = require('path')
 
 // less-loader options
 const addLessLoader = require('customize-cra-less-loader')
 function resolve(dir) {
  return path.join(__dirname, dir)
}
const customize = () => (config, env) => {
  config.resolve.alias['@'] = resolve('src')
  if (env === 'production') {
      config.externals = {
          'react': 'React',
          'react-dom': 'ReactDOM'
      }
  }

  return config
};
  module.exports = override(
   fixBabelImports('import', {
      libraryName: 'antd',
     libraryDirectory: 'es',
      style: 'css',
    }),
    addDecoratorsLegacy(),
    addLessLoader({
      cssLoaderOptions: {
        sourceMap: true,
        modules: {
          localIdentName: "[hash:base64:8]",
        },
      },
      lessLoaderOptions: {
        lessOptions: {
          strictMath: true,
        },
      },
    }),customize()

  );