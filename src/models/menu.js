// https://github.com/ant-design/ant-design-pro/issues/4358
const MenuModel = {
  namespace: 'menu',
  state: {
    // 侧边路由
    menuData: [
      { path: '/admin', redirect: '/admin/welcome' },
      { path: '/admin/welcome', name: '欢迎', icon: 'user', authority: ['admin'], component: './Welcome' },
      {
        path: '/admin/da',
        name: '控制台1',
        icon: 'video-camera',
        children: [ //  此处相同于router中routes
          { path: '/admin/da/one', name: '控制台1-1', component: './dashboardOne/one' },
          { path: '/admin/da/two', name: '控制台1-2', component: './dashboardOne/two', icon: 'video-camera' },
        ],
      },
      { path: '/admin/set', name: '设置', icon: 'setting', component: './set' },
      { path: 'https://github.com/', name: 'Github外链', icon: 'github', target: '_blank' },
    ],
  },
  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'setLeftMenu',
        payload: [],
      });
    },
  },
  reducers: {
    setLeftMenu(state, action) {
      return { ...state, menuData: action.payload || [] };
    },
  },
};
export default MenuModel;
