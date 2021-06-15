export default {
	// 主页 tab 配置
	homeTab: {
		title: '主页',                     //  tab 显示标题
		menuId: 'index',                   //  tab 内部名称(用来识别当前打开的tab)
		components: [{ path: 'index' }],     //  tab 对应的组件
		close: false,
	}
}
