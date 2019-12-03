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