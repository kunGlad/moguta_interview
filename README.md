## 官网

[官网](https://umijs.org/docs/guides/getting-started)

## 记录遇到的问题

1> 执行 yarn install 的过程报错：淘宝源错误

切换淘宝源为 [新的淘宝源链接](https://registry.npmmirror.com/)

2> 安装 mockjs 提示 找不到

mockjs 应该是没有 ts module 全局声明一下就行了

3> 模拟数据

封装 axios 后 跟着文档操作就行， 无需在 home 中再引入 这个 umi 会自动引入调用
