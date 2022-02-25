const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
      	// 此处根据 less-loader 版本的不同会有不同的配置，详见 less-loader 官方文档
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3d6be9',
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}