module.exports = {
  // 公共路径(必须有的)
  publicPath: process.env.NODE_ENV === 'production'
      ? '/novel/'
      : '/',
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave:false,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  // css相关配置(我暂时没用到)
  // css: {
  // 是否使用css分离插件 ExtractTextPlugin
  // extract: true,
  // 开启 CSS source maps?
  // sourceMap: false,
  // css预设器配置项
  // loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false
  // },
  // webpack-dev-server 相关配置
  devServer: {
	open: true,  // npm run serve后自动打开页面
	host: '0.0.0.0',  // 匹配本机IP地址(默认是0.0.0.0)
	port: 8088, // 开发服务器运行端口号
	proxy: null,
	// 注：目前本项目暂时没有写后台接口，没有跨域问题，暂时不配置proxy
  },
	  
	  
    //px转rem的配置（postcss-plugin-px2rem插件）
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
						rootValue: 54,
                        // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propBlackList: [], //黑名单
                        exclude: /(Login)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ]
            }
        }
    }


}