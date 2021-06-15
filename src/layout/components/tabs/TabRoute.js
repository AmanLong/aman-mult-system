// import Vue from "vue";
import components from "@/router/modules/index"
const route = Object.create(null)
route.install = function (vue) {
    // 第一个字符串是 组件名，第二个是组件路径，第三个是包名(如果不指定则已1.js,2.js....n.js命名)
    // vue.component('home', (resolve) => { require.ensure([], () => resolve(require('@/views/Home.vue')), 'home') })
    vue.component('index', (resolve) => { require.ensure([], () => resolve(require('@/views/adminSys/index.vue')), 'index') })
    vue.component('formPage', (resolve) => { require.ensure([], () => resolve(require('@/views/adminSys/test/formPage.vue')), 'formPage') })
    vue.component('tablePage', (resolve) => { require.ensure([], () => resolve(require('@/views/adminSys/test/tablePage.vue')), 'tablePage') })
    vue.component('huawei', (resolve) => { require.ensure([], () => resolve(require('@/views/adminSys/test/huawei.vue')), 'huawei') })
    vue.component('photo', (resolve) => { require.ensure([], () => resolve(require('@/views/adminSys/test/photo.vue')), 'photo') })

    // components.forEach(item => {
    //     vue.component(item.name, (resolve) => { require.ensure([], item.component, item.name) })
    // });
}


export default route