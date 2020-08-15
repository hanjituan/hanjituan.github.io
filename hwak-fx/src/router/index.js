import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "login",
            component: resolve => (require(["@/pages/login"], resolve)),
            // redirect: 'login'
        },
        {
            path: "/home",
            name: "home",
            component: resolve => (require(["@/pages/home"], resolve)),
        }
    ]
});
