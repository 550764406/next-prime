# react + next + antd +express

#版本
v0.0.2

# 技术栈
Nextjs+express+React+Antd+less+cssModules

#安装
1、mkdir next-learn-my && cd next-learn-my
2、npm init
3、npm install --save next react react-dom
4、编写一个测试用的首页，新建一个文件 ./pages/index.js
    function Home() {
      return <div>Welcome to next.js!</div>
    }
    export default Home
5、运行应用 npm run dev
6、安装 antd 包
   npm install --save antd
7、安装依赖 babel-plugin-import
    npm install --save babel-plugin-import
8、新建一个babel配置文件 ./.babelrc
    {
      "presets": [
        "next/babel"
      ],
      "plugins": [
        [
          "import",
          {
            "libraryName": "antd",
            "style": true
          },
          "antd"
        ]
      ]
    }
9、修改index.js文件 ./pages/index.js
    import { Button } from 'antd'
    function Home() {
      return (
        <div>
          Welcome to next.js!
          <Button type="primary">Button</Button>
        </div>
      )
    }
    export default Home

10、安装 LESS 依赖 ，需要安装插件 @zeit/next-less
    npm install --save @zeit/next-less less

11、新建一个 next 配置文件 ./next.config.js
    const withLess = require('@zeit/next-less')

    module.exports = withLess({
      webpack: (config, options) => {
        // Further custom configuration here
        return config
      }
    })

12、创建一个自定义主题的颜色值 assets/antd.less
    @primary-color: #d4380d;

13、配置一下 LESS 依赖包
    npm install --save less-vars-to-js fs path
14、修改 nextJs配置 ./next.config.js
    const withLess = require('@zeit/next-less')
    const lessToJS = require('less-vars-to-js')
    const fs = require('fs')
    const path = require('path')

    // fix: prevents error when .less files are required by node
    if (typeof require !== 'undefined') {
      require.extensions['.less'] = file => { }
    }

    module.exports = withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: lessToJS(
          fs.readFileSync(path.resolve(__dirname, './assets/antd.less'), 'utf8')
        ),
      },
    })
15、安装express
    npm install --save express
16、新建一个server.js
    const express = require('express')
    const next = require('next')

    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })
    const handle = app.getRequestHandler()

    app
      .prepare()
      .then(() => {
        const server = express()

        server.get('*', (req, res) => {
          return handle(req, res)
        })

        server.listen(3000, err => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
      .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
      })
17、修改package.json 配置
    "scripts": {
        "dev": "node server.js",
        "build": "next build",
        "start": "NODE_ENV=production node server.js"
      }
18、更新server.js文件
    const express = require('express')
    const next = require('next')

    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })
    const handle = app.getRequestHandler()

    app
      .prepare()
      .then(() => {
        const server = express()

        server.get('/p/:id', (req, res) => {
          const actualPage = '/post'
          const queryParams = { title: req.params.id }
          app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
          return handle(req, res)
        })

        server.listen(3000, err => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
      .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
      })
19、在.pages/index.js
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
20、新建一个pages/post.js
    import { withRouter } from 'next/router'

    function Post(props) {
        return (
            <div>
                <h1>{props.router.query.title}</h1>
                <p>This is the blog post content.</p>
            </div>
        )
    }

    export default withRouter(Post)
21、安装 isomorphic-unfetch
    npm install --save isomorphic-unfetch

22、更新pages/index.js (如文件所示)

23、SuperAgent 是客户端请求代理模块，使用在nodejs中

24、getiInitialProps是用来实现服务端渲染，此函数为异步函数，可以采用await的方式，用同步的方式写异步的逻辑，
    可以用来获取数据使用，把获取的数据使用props的方式来启用其他的生命周期，注意：不能用在子级组件里


# 参考
网站：
https://blog.jaggerwang.net/nextjs-antd-react-app-develop-tour/
https://nextjs.org/learn/basics/server-side-support-for-clean-urls/create-a-custom-server

