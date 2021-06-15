const Index = () => import('@/views/adminSys/index.vue');
const FormPage = () => import('@/views/adminSys/test/formPage.vue')
const TablePage = () => import('@/views/adminSys/test/tablePage.vue')
const Huawei = () => import('@/views/adminSys/test/huawei.vue')
const Photo = () => import('@/views/adminSys/test/photo.vue')

export default [
    {
        path: '/index',
        name: 'index',
        icon: 'el-icon-s-home',
        title: '主页',
        component: Index,
    },
    {
        path: '/formPage',
        name: 'formPage',
        title: '表单页',
        component: FormPage
    },
    {
        path: '/tablePage',
        name: 'tablePage',
        title: '表格页',
        component: TablePage
    },
    {
        path: '/huawei',
        name: 'huawei',
        title: '华为',
        component: Huawei
    },
    {
        path: '/photo',
        name: 'photo',
        title: '拍照',
        component: Photo
    },
]