const webpack = require( 'webpack' )
const normalizeCompiler = require( './utils/normalizeCompiler' )

function createMegaloTarget( options = {} ) {
  options = normalizeOptions( options )

  const { platform = 'wechat', htmlParse } = options

  return function ( compiler ) {
    const FunctionModulePlugin = require( 'webpack/lib/FunctionModulePlugin' )
    const JsonpTemplatePlugin = require( 'webpack/lib/web/JsonpTemplatePlugin' )
    const LoaderTargetPlugin = webpack.LoaderTargetPlugin
    const MultiPlatformResolver = require( './plugins/MultiPlatformResolver' )
    const MegaloPlugin = require( './plugins/MegaloPlugin' )
    const CopyHtmlparsePlugin = require( './plugins/CopyHtmlparsePlugin' )
    const FrameworkPlugins = [
      require( './frameworks/vue/plugin' ),
      require( './frameworks/regular/plugin' )
    ]

    // add to webpack resolve.plugins in order to resolve muti-platform js module
    !compiler.options.resolve.plugins && (compiler.options.resolve.plugins = []);
    compiler.options.resolve.plugins.push(new MultiPlatformResolver(platform));

    new FunctionModulePlugin().apply( compiler )
    new JsonpTemplatePlugin().apply( compiler )
    new LoaderTargetPlugin( 'mp-' + platform ).apply( compiler )
    new MegaloPlugin( options ).apply( compiler )
    FrameworkPlugins.forEach( Plugin => new Plugin( options ).apply( compiler ) )

    if ( !!htmlParse ) {
      new CopyHtmlparsePlugin( { htmlParse, platform } ).apply( compiler )
    }
  }
}

function normalizeOptions( options = {} ) {
  return Object.assign( {}, options, {
    compiler: normalizeCompiler( options.compiler || {} )
  } )
}

module.exports = createMegaloTarget
