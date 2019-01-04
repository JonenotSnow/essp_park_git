# essp_web

## 项目介绍
```
├── README.md                       项目介绍
│  │
├── index.html                      入口页面
│  │
├── build                           构建脚本目录
│  ├── build-server.js              运行本地构建服务器，可以访问构建后的页面
│  ├── build.js                     生产环境构建脚本
│  ├── dev-client.js                开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
│  ├── dev-server.js                运行本地开发服务器
│  ├── utils.js                     构建相关工具方法
│  ├── webpack.base.conf.js         wabpack基础配置
│  ├── webpack.dev.conf.js          wabpack开发环境配置
│  └── webpack.prod.conf.js         wabpack生产环境配置
│  │
├── config                          项目配置
│  ├── dev.env.js                   开发环境变量
│  ├── index.js                     项目配置文件
│  ├── prod.env.js                  生产环境变量
│  └── test.env.js                  测试环境变量
│  │
├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
│  │
├── src                             源码目录
│  ├── main.js                      入口js文件
│  ├── app.vue                      根组件
│  ├── components                   公共组件目录
│  │  └── title.vue
│  │
│  ├── assets                       资源目录，这里的资源会被wabpack构建
│  │  └── CSS                       公共CSS以及CSS
│  │  └── images                    静态图片
│  │    └── logo.png
│  │
│  ├── routes                       前端路由
│  │  └── index.js
│  │
│  ├── fetch                        ajax请求
│  │  ├── apiUrl.js                 接口地址
│  │  └── http.js                   接口公共方法
│  │
│  ├── util                         引入需要的插件
│  │
│  ├── store                        应用级数据（state）状态管理
│  │  └── modules                   模块
│  │  └── index.js
│  └── views                        页面目录
│    ├── matchmak
│    └── parkHall                   二级目录 园区大厅
│  │  └── home                      园区大厅首页模块
│  │  └── active                    活动页模块
│  │  └── affair                    群组事务
│  │  └── goverBenefitService       政惠服务
│  │  └── information               园区资讯
│  │  └── preview                   园区预览
│  │  └── records                   走访记录
│  │
├── static                          纯静态资源，不会被wabpack构建。
│  │  └── reset.css                 重置文件css
```
## 项目目录结构

## .Vue文件的命名规范
    ### 普通页面用小驼峰,并且以模块名称为前缀
        1、用小写字母，如 activeXxx;
    ### 组件文件名时 (大驼峰)
        1、单词首字母大写，前缀为：Essp；如：EsspXxx
## CSS、JS命名规范说明
    ### CSS
    1、公共样式前缀为essp-，普通以模块为前缀 active-xxx ;
    2、长单词取其前 4-5 个字母，xxxxx-xxxx;
    格式：essp-模块名-功能名
    例如：essp-user-head、essp-user-main、essp-user-foot、
    ### JS
    1、方法用驼峰法，例如：handleClick

## vue组件的引用示例
    ### 在script里
        import EsspXxxYyy from ''

        components: {
            EsspXxxYyy
        }
    ### 在template里
        <essp-xxx-yyy></essp-xxx-yyy>
## 代码提交
    1、git pull【每天打开电脑第一件事，获取新代码，其他情况按需使用】
    2、git status【检查自己代码的更新状态】
    3、git add .【添加】
    4、git commit -am '提交内容书写'【提交】
    5、git push【推送】。
    ps: 确保git push成功！！！！！！！！！！
## 代码执行
    1. npm install ||  cnpm install
    2. npm run dev   运行
    3. npm run build 打包

