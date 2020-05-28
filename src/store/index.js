import Vue from 'vue'
import Vuex from 'vuex'
// 在store的入口文件中引入模块
import cart from './modules/cart'
import products from './modules/products'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            email: 'xxxxxxx@qq.com'
        }
    },
    modules: {
        cart,
        products
    }
})

