import Vue from 'vue'
import Router from 'vue-router'



// 解决重复点击菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve => (require(["@/pages/login.vue"], resolve))
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => (require(["@/pages/index.vue"], resolve)),
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: resolve => (require(["@/pages/homepage/dashboard.vue"], resolve)),
                },
                {
                    path: '/topology',
                    name: 'topology',
                    component: resolve => (require(["@/pages/homepage/topology.vue"], resolve)),
                },
                {
                    path: '/album',
                    name: 'album',
                    component: resolve => (require(["@/pages/album/album.vue"], resolve)),
                },
                {
                    path: '/equipmentAssets',
                    name: 'equipmentAssets',
                    component: resolve => (require(["@/pages/assetsManage/equipmentAssets.vue"], resolve)),
                },
                {
                    path: '/tentManage',
                    name: 'tentManage',
                    component: resolve => (require(["@/pages/assetsManage/tentManage.vue"], resolve)),
                },

            ]
        },

    ]
})
