const path = require('path')

const FsService = require('./fs')

// 读取配置信息
// ======================================
const options = {
  pages: ['home/a', 'home/b', 'about/a'], // 目标要生成文件的路径 | Array 必填项
  pagePrefix: 'src/views', // 目标文件前缀 如 src/views/...  默认为src/views | string
  pageSuffix: '.vue', // 目标文件后缀 默认为 .vue | string
  isRoute: false, // 是否开启生成路由表 false | boolean
  localRoutePath: 'router/index.js', // 本地路由配置表存放的路径 router/index.js | string 【当开启生成路由表，此参数为必填项】
  routePrefix: '@/view', // 生成路由的前缀 @/view | string
}
// ======================================

class GenerateFile extends FsService {
  constructor(options) {
    super()

    this.options = {
      pages: [],
      pagePrefix: 'src/views',
      pageSuffix: '.vue',

      isRoute: false,
      localRoutePath: '',
      routePrefix: '@/views',
      isRouteDynamic: true,
      routeStartMark: '/** autoRouteStart */',
      routeEndMark: '/** autoRouteEnd */',
      ...options,
    }

    this.init()
  }

  init() {
    this.genFile()
  }

  async genFile() {
    let { pages, pageSuffix, isRoute } = this.options

    if (this.genFileValidate()) return false

    const pagePrefix = this.handlePagePrefixPath()

    try {
      let importTemplate = []
      let routesTemplate = []
      for (const page of pages) {
        const catalog = page.substring(0, page.lastIndexOf('/') + 1)
        const fileName = page.substring(page.lastIndexOf('/') + 1, page.length)
        const fullPageItem = `${pagePrefix}${catalog}${fileName}${pageSuffix}`

        await this.writeFileRecursive(fullPageItem)

        if (isRoute && this.options.localRoutePath) {
          importTemplate.push(
            this.ImportRouteTemplate(
              fileName,
              `${this.options.routePrefix}/${catalog}${fileName}${pageSuffix}`
            )
          )
          routesTemplate.push(...this.routesTemplate(fileName))
        }

        console.log(
          `恭喜您，在\x1B[32m【${pagePrefix}${catalog}】\x1B[0m目录下，文件\x1B[32m【${fileName}${pageSuffix}】\x1B[0m生成成功`
        )
      }
      if (isRoute && this.options.localRoutePath) {
        const rinfo = await this.getRouteInfo()
        const newRinfo = this.genRoutes(
          rinfo,
          [...importTemplate, ''],
          routesTemplate
        )
        await this.writeFile(this.options.localRoutePath, newRinfo.join('\n'))
        console.log('\x1B[34m恭喜您，路由已自动生成\x1B[0m')
      }
    } catch (error) {
      console.log(`\x1B[31m${error}\x1B[0m`)
    }
  }

  genFileValidate() {
    if (this.options.pages.length === 0) {
      console.log('【\x1B[31mpages\x1B[0m】字段为空，生成失败')
      return true
    }
    return false
  }
  handlePagePrefixPath() {
    let { pagePrefix } = this.options

    if (pagePrefix.lastIndexOf('/') !== pagePrefix.length - 1) {
      pagePrefix = pagePrefix + '/'
    }

    if (pagePrefix.indexOf('/') === 0) {
      pagePrefix = pagePrefix.slice(1)
    }

    return pagePrefix
  }
  getRouteInfo() {
    let { localRoutePath } = this.options
    return this.readFile(localRoutePath).then((info) => info.split('\n'))
  }

  genRoutes(fileInfo, addValue = [], addRoutes = []) {
    const info = [...fileInfo]

    const { routeStartMark, routeEndMark } = this.options
    const skey = info.indexOf(routeStartMark)

    if (info[skey - 1] === '') {
      info.splice(skey - 1, 1)
      info.splice(skey - 1, 0, ...addValue)
    } else {
      info.splice(skey, 0, ...addValue)
    }

    const ekey = info.indexOf(routeEndMark)

    if (ekey > -1 && info[ekey - 1] === ']') {
      info.splice(ekey - 1, 0, ...addRoutes)
    }

    return info
  }

  fistLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  ImportRouteTemplate(strName, path) {
    const componentName = this.fistLetterUpper(strName)
    return `const ${componentName} = () => import(/* webpackChunkName: "${strName}" */ '${path}')`
  }

  routesTemplate(path) {
    const componentName = this.fistLetterUpper(path)
    const tab = '  '
    return [
      `${tab}{`,
      `${tab.repeat(2)}path:'/${path}',`,
      `${tab.repeat(2)}name:'${path}',`,
      `${tab.repeat(2)}component: () => ${componentName},`,
      `${tab}},`,
    ]
  }
}

new GenerateFile(options)
