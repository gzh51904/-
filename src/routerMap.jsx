//routerMap.js

import Cart from './pages/Cart/index';
import My from './pages/Mine/My/index.jsx';
import Mine from './pages/Mine/index.jsx';


export default [
   { path: "/cart", name: "Request", component: Cart, auth: true },
  { path: "/my", name: "Like", component: My, auth: true },
  { path: "/mine", name: "PopModule", component: Mine, auth: true },
 ]