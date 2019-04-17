├── README.md                       项目介绍
│  │
├── index.html                      入口页面
│  │
├── build                           构建脚本目录
│  ├── build.js                     生产环境构建脚本
│  ├── utils.js                     构建相关工具方法
│  ├── webpack.base.conf.js         wabpack基础配置
│  ├── webpack.dev.conf.js          wabpack开发环境配置
│  └── webpack.prod.conf.js         wabpack生产环境配置
│  │
├── config                          项目配置
│  ├── dev.env.js                   开发环境变量
│  ├── index.js                     项目配置文件
│  ├── prod.env.js                  生产环境变量
│  │
├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
│  │
├── src                             源码目录
│  ├── main.js                      入口js文件
│  ├── app.vue                      根组件
│  ├── components                   公共组件目录
│  │  ├── EsspEditor.vue			富文本编辑器组件
│  │  ├── EsspFoot.vue				公共页面底部
│  │  ├── EsspHead.vue				公共页面顶部
│  │  ├── EsspImage.vue				图片多功能组件
│  │  ├── EsspNav.vue				菜单组件
│  │  └── EsspTagNew.vue			标签组件
│  │
│  ├── assets                       资源目录，这里的资源会被wabpack构建
│  │  ├── CSS                       公共CSS以及CSS
│  │  └── images                    静态图片
│  │
│  ├── routes                       前端路由
│  │  ├── index.js					公共路由
│  │  ├── user.js					平台公共路由
│  │  ├── match.js					撮合路由
│  │  ├── center.js					企业中心路由
│  │  ├── park.js					园区路由
│  │  └── center.js					后台路由
│  │
│  ├── fetch                        ajax请求
│  │  ├── apiUrl.js                 接口地址
│  │  └── http.js                   接口公共方法
│  │
│  ├── util                         公共工具js文件
│  │  ├── sessionStorageHandler.js	会话存储
│  │  └── utils.js                  公共工具方法
│  │
│  ├── store                        应用级数据（state）状态管理
│  │  └── modules                   模块
│  │  └── index.js
│  └── views                        业务代码
│  │  ├── user						平台公共代码
│  │  ├── matchmak					撮合分类/企业中心代码
│  │  ├── parkHall                  园区大厅代码
│  │  └── admin                  	后台代码
│  │
├── static                          纯静态资源，不会被wabpack构建。
│  │  ├── cdn                  		cdn预加载
│  │  └── reset.css                 重置文件css

