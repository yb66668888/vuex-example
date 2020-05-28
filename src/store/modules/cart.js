import shop from '../../api/shop'
import { CART, PRODUCTS } from '../mutation-types'
import Vue from 'vue'

const state = {
    items: [], // 购物车的数据
    checkoutStatus: null // 当前订单状态的值
}

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
    // cartProducts: function (state, getters, rootState) {
        // 获取state中的items并且进行遍历
        return state.items.map(({ id, quantity}) => {
            // 找到rootState 公共store中的products的all,是否有items中的id，如果有就直接返回一个新的对象，包含title,price,quantity三个字段
            const product = rootState.products.all.find(product => product.id === id)
            return {
                title: product.title,
                price: product.price,
                quantity
            }
        })
    },
    cartTotalPrice: (state, getters) => {
    // cartTotalPrice: function (state, getters) {
        // 获取getters中的cartProducts的数据并进行reduce方法计算总价格
        return getters.cartProducts.reduce(function(total, product){
            // 单价*数量
            return product.price * product.quantity
        }, 0)
    }
}

// actions
const actions = {
    // 添加到清单
    addProductToCart({  state, commit }, product) {
        // 添加的时候先清空状态
        commit(CART.SET_CHECKOUT_STATUS, null)
        // 判断添加的当前product的数量如果大于0
        if (product.inventory > 0) {
            // 找到当前是否有这个产品的存在
            const cartItem = state.items.find(item => item.id == product.id)
            if (!cartItem) {
                // 如果没有，就调用mutation中的存储方法
                commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id, canAdd: product.canAdd })
            } else {
                // 如果有的话，就增加items中对应数据的quantity数量就可以了
                // 在cartItem对象上添加新属性canAdd
                Vue.set(cartItem, 'canAdd', product.canAdd);
                commit(CART.INCREMENT_ITEM_QUANTITY, cartItem)
            }
            // 跨modules调用products模块的减少产品的数量
            commit(`products/${PRODUCTS.REDUCE_STOCK}`, { id: product.id }, { root: true })
        }
    },
    // 提交购物车的清单
    checkout( {state, commit}, products) {
        // 暂存items数据
        const saveCartItems = [...state.items]
        // 首先先去清空已经有的status
        commit(CART.SET_CHECKOUT_STATUS, null)
        // 直接清空state中的items
        commit(CART.SET_CART_ITEMS, { items: [] })
        // 调用接口中的购买接口，传入成功的cb以及失败的cb
        // 如果成功了直接清空购物车的items
        // 如果失败了返回错误信息，并且竟暂存的数据重新赋值给items
        shop.buyProducts(
            products,
            () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
            () => {
                commit(CART.SET_CHECKOUT_STATUS, 'failed')
                commit(CART.SET_CART_ITEMS, { items: saveCartItems })
            }
        )
    }
}

// mutation
const mutations = {
    // 添加购物车没有的数据
    [CART.PUSH_PRODUCT_TO_CART] (state, { id, canAdd }) {
        state.items.push({
            id,
            quantity: canAdd
        })
    },
    // 添加items中的数量quantity
    [CART.INCREMENT_ITEM_QUANTITY] (state, { id }) {
        const cartItem = state.items.find(item => item.id === id)
        // 添加过的直接quantity + canAdd
        cartItem.quantity = cartItem.quantity + cartItem.canAdd;
    },
    // 修改当前订单的状态status
    [CART.SET_CHECKOUT_STATUS] (state, status) {
        state.checkoutStatus = status
    },
    // 重新赋值购物车items的数据
    [CART.SET_CART_ITEMS] (state, { items }) {
        state.items = items
    }
}

export default {
    namespaced: true, // 开启命名空间
    state,
    getters,
    actions,
    mutations
}