import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.baseURL = 'http://localhost:3000/web/api'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
