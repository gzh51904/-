import Cart from "./pages/Cart/index";

// 导出需要拦截的路由
export default [
    { path: "/cart", name: "Cart", component: Cart, auth: true }
]