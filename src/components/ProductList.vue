<template>
   <ul>
       <li v-for="product in products" :key="product.id">
           {{product.title}} - {{product.price}}
           <button
                :disabled="product.canAdd==0"
                @click="desCanNumber(product.id)">
               -
           </button>
           {{ product.canAdd }}
           <button
                :disabled="product.canAdd==product.inventory"
                @click="addCanNumber(product.id)">
               +
           </button>
           <br>
           <button :disabled="!product.inventory||!product.canAdd" 
                    @click="addProductToCart(product)">
               加入购物车
           </button>
       </li>
   </ul>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    computed: mapState({
        products: state => state.products.all
    }),
    methods: {
        ...mapActions('cart',['addProductToCart']),
        ...mapMutations('products',{
            addCanNumber: 'productAddCanNumber',
            desCanNumber: 'productDesCanNumber'
        })
    },
    created() {
        this.$store.dispatch('products/getAllProducts')
    }
}

// ES5及传统写法
// export default {
//     computed: {
//         products() {
//             return this.$store.state.products.all
//         }
//     },
//     methods: {
//         // 添加购物车
//         addProductToCart(product) {
//             this.$store.dispatch('cart/addProductToCart', product);
//         },
//         // 点击减
//         desCanNumber(id) {
//             this.$store.commit('products/productDesCanNumber', id)
//         },
//         // 点击加
//         addCanNumber(id) {
//             this.$store.commit('products/productAddCanNumber', id)
//         }
//     },
//     created() {
//         // 进来通过dispatch调用getProducts action
//         this.$store.dispatch('products/getAllProducts')
//     }
// }
</script>