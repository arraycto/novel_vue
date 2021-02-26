import Vue from 'vue'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/display.css';
import './assets/js/rem.js'
import 'lib-flexible/flexible.js'

// import axios from 'axios'
import '@/assets/css/base.css'
import App from './App.vue'
import store from './store'
import router from './router'

import preventReClick from './assets/js/preventReClick.js'
import {request} from './network/request.js' //网络请求

Vue.config.productionTip = false

Vue.use(animated)

//前端拦截器
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
			
      if (window.localStorage.getItem("token") != null) {
						//判断token是否过期
						request({
							url: '/verification',
							method: 'post'
						}).then(res => {
							if(res.status == 201){//token过期
								window.localStorage.clear()
								store.commit('updataUserName')
								store.commit('updataImg')
								next({
									path: '/login'
								}) 
							}else{//token未过期
								next()
							}
						}).catch( err => {
							console.log(err)
							next()
						})
      }else{
				next({
				  path: '/login'
				})
			}
    }else{
      next()
    }
  }
)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.defaultUrl = 'http://39.107.68.86:8888/'