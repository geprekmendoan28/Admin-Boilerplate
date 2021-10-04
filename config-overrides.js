const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
const path = require('path');
module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@context': path.resolve(__dirname, 'src/context'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@constant': path.resolve(__dirname, 'src/constant'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@service': path.resolve(__dirname, 'src/service'),
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#4f72ff' },
  }),
  addDecoratorsLegacy()
);
