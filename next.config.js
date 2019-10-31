const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => { }
}

module.exports = withLess({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: lessToJS(
            fs.readFileSync(path.resolve(__dirname, './assets/antd.less'), 'utf8')
        ),
    },
})