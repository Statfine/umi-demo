/**
 * 登录后的页面-控制面板页面
 *  /admin 从定向到 /admin/welcome
 */
const adminRouter = {
  path: '/admin',
  component: '../layouts/BasicLayout',
  authority: ['admin'],
  routes: [
    {
      path: '/admin',
      // component: './Welcome',
      redirect: '/admin/welcome',
    },
    {
      path: '/admin/welcome',
      name: '欢迎',
      icon: 'user',
      authority: ['admin'],
      component: './Welcome',
    },
    {
      path: '/admin/set',
      name: '控制台1',
      icon: 'video-camera',
      routes: [
        { path: '/admin/set/one', name: '控制台1-1', component: './dashboardOne/one' },
        { path: '/admin/set/two', name: '控制台1-2', component: './dashboardOne/two' },
      ],
    },
  ],
};
// 404页面
const notFoundRouter = { component: './404' };

const Rooters = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user', 'guest'],
    routes: [
      {
        path: '/',
        routes: [
          { path: '/', component: './user/login.js', authority: ['guest'] }, // 首页
          { path: '/login', component: './user/login.js', authority: ['guest'] }, // 登录页面
          adminRouter, // 控制台
          notFoundRouter, // 404
        ],
      },
    ],
  },
  notFoundRouter, // 404
];

export default Rooters;
