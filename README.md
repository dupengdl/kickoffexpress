# kickoffexpress

### 概述
利用express+mongodb搭建后端服务提供数据,前端采用React＋Redux的方式，结合webpack进行开发
学习express开发流程及中间件的概念,学习mongodb相关知识及mongoose的使用,继续梳理redux的开发流程

### 总结[TODO]
1.  学习了express中session管理的相关内容
2.  了解了passport的使用及调用流程
3.  学习了express路由相关的配置管理及路由的访问限制
4.  测试了跨域请求CORS
5.  RedisStore配置及express环境搭建
6.  初步认识了redux中间件的作用
7.  初步了解了redux对组件的绑定流程
8.  

### 环境搭建
1.  Mac下，采用brew install mongodb,并根据提示设置开机启动
2.  cnpm install

### 命令
1.  npm start 本地调试开发
2.  npm run build 编译静态文件(打md5 hash值,替换文件路径等)
3.  npm run prod 编译静态文件并以线上模式运行

### sass目录结构
* index.scss index页面css文件
* common.scss 通用css模块
* mixin 公用mixin
* varibles 全局变量

### js目录结构
运用redux官方推荐的react组件分层结构
* `actions` action类型的定义
* `components` 展现层组件,不关心外部数据,纯展现层
* `constants` 常量定义,如action名称等
* `containers` 外层组件,和redux进行绑定(state及action的绑定),对数据敏感
* `middleware` 自定义的redux中间件
* `reducers` action触发后对state分别处理,返回新的state,最后把所有reducer进行组合
* `store` redux中唯一的store,把reducer与store进行绑定
* `utils` 通用工具函数封装
* `index.js` 将store与外层组件进行绑定
