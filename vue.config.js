const path = require('path')
const fs = require('fs')

// Plugins for vue import components and element-plus components automatically 
// npm install -D unplugin-vue-components unplugin-auto-import
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// Generate pages object
const pages = {}

function getEntryFile(entryPath) {
  let files = fs.readdirSync(entryPath)
  return files
}

const entryName = getEntryFile(path.resolve(`src/entry`))

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
entryName.forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
  }
})

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  pages,
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`style.css`),
            to: `${path.resolve('dist')}/`
          }
        ]
      }
    ])
  },
  configureWebpack: {
    // Plugins for vue import components and element-plus components automatically 
    // npm install -D unplugin-vue-components unplugin-auto-import
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    extract: false // Make sure the css is the same
  },
}
