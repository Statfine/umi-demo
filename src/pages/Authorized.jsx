import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import { getAuthority } from '../utils/authority';
import Authorized from '@/utils/Authorized';

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// noMatch
const noMatch = auth => {
  if (auth.includes('guest')) return <Redirect to="/login" />;
  if (auth.includes('admin')) return <Redirect to="/admin/welcome" />;
  return <Redirect to="/login" />;
};

/**
 *  authority.js 中获取到的(localStorage - antd-pro-authority)权限是否和router.js中authority向匹配
 *    1.匹配 进入路由页面
 *    2.不匹配执行noMatch做跳转
 */
const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  console.log('isLogin', isLogin);
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      // noMatch={isLogin ? <Redirect to="/404" /> : <Redirect to="/login" />}
      noMatch={noMatch(getAuthority())}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user }) => ({
  user,
}))(AuthComponent);
