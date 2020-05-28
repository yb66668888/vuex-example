// 购物的api请求存放位置


// 产品总列表
const _products = [
    {'id': 1, 'title': '华为 mate 20 Pro', 'price': 4999, 'inventory': 2, 'canAdd': 0},
    {'id': 2, 'title': '小米 9', 'price': 2999, 'inventory': 0, 'canAdd': 0},
    {'id': 3, 'title': 'OPPO R11', 'price': 1999, 'inventory': 10, 'canAdd': 0}
]

export default {
    // 获取产品列表
    getProducts (cb) {
        // 模拟异步请求
        setTimeout(function(){
            cb(_products)
        },100)
    },

    // 提交购买
    buyProducts (products, cb, errorCb) {
        // 模拟ajax请求的成功和失败
        setTimeout(function(){
            Math.random() > 0.5 ? cb() : errorCb()
        },100)
    }
}