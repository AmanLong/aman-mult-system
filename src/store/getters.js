import TYPE from "./getter-types"
export default {
    [TYPE.getSysImg](state) {
        return (name) => {
            let _obj = state.sysImgs.find(item => item.name === name)
            return _obj.img;
        }
    },
    [TYPE.getSysImgNum](state) {
        return state.sysImgs.length;
    },
    [TYPE.getCard](state) {
        return state.card;
    },
    [TYPE.getMenuList](state) {
        return state.menuList;
    }
}