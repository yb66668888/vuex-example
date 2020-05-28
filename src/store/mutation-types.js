export const PRODUCTS = {
    SET_PRODUCTS: 'setProducts', // 产品列表
    REDUCE_STOCK: 'reduceStock', // 库存
    PRODUCT_ADDCANNUMBER: 'productAddCanNumber', // 添加购物车按钮：加号
    PRODUCT_DESCANNUMBER: 'productDesCanNumber' // 购物车数量减一
}

export const CART = {
    PUSH_PRODUCT_TO_CART: 'pushProductToCart', // 添加产品到清单里面
    INCREMENT_ITEM_QUANTITY: 'incrementItemQuantity', // 增加项的数量
    SET_CART_ITEMS: 'setCartItems', // 设置商品项目
    SET_CHECKOUT_STATUS: 'setCheckoutStatus', // 设置订单的状态
}