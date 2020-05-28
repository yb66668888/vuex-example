import shop from '../../api/shop'
import {PRODUCTS} from '../mutation-types'

const state = {
    // 整个产品的列表，起始为空数组
    all: [] 
}

const getters = {

}

const actions = {
    getAllProducts({ commit }) {
        // 模拟异步操作 放在action里面然后调用commit来调用mutations里面的方法来改变state中的数据
        shop.getProducts(function(products){
            commit(PRODUCTS.SET_PRODUCTS, products)
        })
    }
}

const mutations = {
    // mutations中的将参数直接赋值给state中的all变量
    [PRODUCTS.SET_PRODUCTS] (state, products) {
        state.all = products
    },
    // 添加购物车时，对应的库存也做减一操作
    // 根据参数来判断当前的all数据中是否有该id的数据，如果有的话直接将当前的产品的inventory数量减1
    [PRODUCTS.REDUCE_STOCK] (state, { id }) {
        const product = state.all.find(product => product.id === id)
        // 添加到购物车后，当前库存 - 添加的数量 = 剩下的库存
        product.inventory = product.inventory - product.canAdd
        // 添加的数量并进行清空
        product.canAdd = 0
    },
    // 加一的时候调用的mutation
    [PRODUCTS.PRODUCT_ADDCANNUMBER] (state, id) {
        const product = state.all.find(product => product.id == id)
        product.canAdd ++
    },
    // 减一的时候调用的mutation
    [PRODUCTS.PRODUCT_DESCANNUMBER] (state, id) {
        const product = state.all.find(product => product.id == id)
        product.canAdd --
    }
}

export default {
    namespaced: true, // 开始命名空间
    // 每个模块都包含state、getters、actions、mutations
    state,
    getters,
    actions,
    mutations
}


