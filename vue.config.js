module.exports = {
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  // https://forum.vuejs.org/t/cli3-assetspublicpath-equivalent/35008
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // // where to output built files
  // outputDir: "dist",

  // // where to put static assets (js/css/img/font/...)
  // assetsDir: ".static/",
  runtimeCompiler: true
}
