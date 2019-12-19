# 开发movieDemo 项目总结

## 1. 使用 vue-admin-template 开发管理后台总结

### 1.1 this.$store.dispatch('user/login',this.loginForm),中的'user/login'是什么意思？

> this.$store.dispatch('user/login',this.loginForm) 中的 'user/login' 指的不是登				录请求路径，而是 vuex 中 user.js 模块中的方法 login

```javascript
handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.$store.dispatch('user/login',this.loginForm) 中的 'user/login' 指的不是登				录请求路径，而是 vuex 中 user.js 模块中的方法 login
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
```

## 1.2 layout 中的组件介绍

layout 中 compoents 中的 navBar 指的是头部导航条



## 1.3 为当前组件绑定一个自定义的值，使用 :data-[属性名]

```javascript
// :data-  之后的就是自定义的属性名（gIndex）
<view class="movie-star" :data-gIndex='i' @click="praiseMe"></view>
// 实现点赞动画效果
praiseMe(e){
    // 拿到自定义的组件 属性值，注意使用 dataset.属性名，获取值，属性名只能写小写,即gIndex --> 		gindex。
    let gIndex = e.currentTarget.dataset.gindex;
    console.log(gIndex)
}
```



## 1.4 uni-app  用户交互 `API`

```javascript
// 页面刷新 触发 生命周期钩子
onPullDownRefresh(){} 
// 停止 下拉刷新
uni.stopPullDownRefresh() 
// 显示 加载提示框
uni.showLoading()
// 隐藏 加载提示框
uni.hideLoading()
// 显示 导航栏加载 图标，
// 1.在h5 显示需要在pages.json 中设置 页面导航栏 为true
// 2.在该页面调用 API  ---> showNavigationBarLoading()
"titleNView": true //禁用原生导航栏,小程序不能禁用
uni.showNavigationBarLoading()
// 隐藏 导航栏加载 图标，
uni.hideNavigationBarLoading()

```

## 1.5 如何将本地仓库代码与远程仓库代码同步
- 只使用 `git pull` 命令是不行的。
- 得先使用 `git fetch` 命令将本地库与远程库同步，
- 再使用 `git pull` 命令将远程库的代码拉去到本地库。

