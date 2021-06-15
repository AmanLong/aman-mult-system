import TYPES from "./mutation-types";
export default {
  [TYPES.changeLoginStatus](state, status) {
    state.isLogin = status;
  },

  [TYPES.changeCardStatus](state, card) {
    state.card = card;
  },

  [TYPES.changeUserName](state, userName) {
    state.userName = userName;
  },

  [TYPES.addSysImg](state, obj) {
    state.sysImgs = [obj, ...state.sysImgs];
  },

  [TYPES.updateSysImg](state, obj) {
    let _obj = state.sysImgs.find(item => item.name === obj.name)
    _obj.img = obj.img;
  },

  [TYPES.setMenuList](state, list) {
    state.menuList = list;
  },
}