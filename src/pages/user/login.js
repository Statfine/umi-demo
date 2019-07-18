// import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import { Button, Input, Icon } from 'antd';
import React from 'react';
import router from 'umi/router';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import styles from './style.less';
import logoImg from './images/logo.png';

class LoginComponent extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };

  handleLogin = () => {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    console.log('获取login', username, password);
    // 设置权限，reload权限，修改页面渲染，跳转页面
    setAuthority('admin');
    reloadAuthorized();
    dispatch({
      type: 'user/setCurrentUser',
      payload: { name: 'shaojia' },
    });
    router.push('/admin');
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.loginContent}>
          <div className={styles.title}>
            <img className={styles.loginImg} alt="logo" src={logoImg} />
            <p style={{ margin: 0 }}>管理后台系统</p>
          </div>
          <Input
            size="large"
            placeholder="请输入电子邮箱或者手机号码"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
            onPressEnter={this.handleLogin}
          />
          <Input
            size="large"
            style={{ margin: '23px 0 52px 0' }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', fontSize: 16 }} />}
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            onPressEnter={this.handleLogin}
          />
          <Button type="primary" size="large" style={{ width: '368px' }} onClick={this.handleLogin}>
            登录
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(LoginComponent);
