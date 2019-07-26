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
      path: '/admin/da',
      name: '控制台1',
      icon: 'video-camera',
      routes: [
        {
          path: '/admin/da/one',
          name: '控制台1-1',
          component: './dashboardOne/one',
          icon: 'video-camera',
        },
        { path: '/admin/da/two', name: '控制台1-2', component: './dashboardOne/two' },
      ],
    },
    {
      path: '/admin/set',
      name: '设置',
      icon: 'setting',
      component: './set',
    },
    {
      path: '/admin/set2',
      name: '设置2',
      icon: 'setting',
      component: './set',
      authority: ['guest'], // 此处权限不匹配则不显示
    },
    {
      path: '/admin/policy1',
      name: 'policy1',
      component: './Welcome',
    },
    {
      path: '/admin/policy2',
      name: 'policy2',
      component: './Welcome',
    },
    {
      path: 'http://baidu.com',
      name: 'baidu',
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
          { path: '/project/:id', component: './routerpage/routerOne.js' },
          { path: '/zt/:id', component: './routerpage/routerTwo.js' },
          { path: '/pz/:id', redirect: '/zt/:id', },
          notFoundRouter, // 404
        ],
      },
    ],
  },
  notFoundRouter, // 404
];

export default Rooters;
