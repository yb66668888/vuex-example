<template>
    <div class="cart">
        <h2>清单</h2>
        <p v-show="!products.length">
            <i>请添加产品到购物车</i>
        </p>
        <ul>
            <li 
                v-for="product in products"
                :key="product.id">
                {{ product.title }} - {{ product.price }} x {{ product.quantity }}
            </li>
        </ul>
        <p>合计{{ total }}</p>
        <p>
            <button
                :disabled="!products.length"
                @click="checkout(products)">
                提交
            </button>
        </p>
        <p v-show="checkoutStatus">提交状态：提交{{ checkoutStatus }}.</p>
    </div>
</template>
<script>
// import { mapState, mapGetters } from 'vuex'
// export default {
//     computed: {
//         ...mapState({
//             checkoutStatus: state => state.cart.checkoutStatus
//         }),
//         ...mapGetters('cart',{
//             products: 'cartProducts',
//             total: 'cartTotalPrice'
//         })
//     },
//     methods: {
//         checkout(products) {
//             this.$store.dispatch('cart/checkout', products)
//         }
//     }
// }


// ES5及传统写法
export default {
    computed: {
        // 从getters获取购物车的信息
        products() {
            return this.$store.getters['cart/cartProducts']
        },
        // 购物车的总价格
        total() {
            return this.$store.getters['cart/cartTotalPrice']
        },
        // 提交状态
        checkoutStatus() {
            return this.$store.state.cart.checkoutStatus
        }
    },
    methods: {
        checkout(products) {
            this.$store.dispatch('cart/checkout', products)
        }
    }
}
</script>