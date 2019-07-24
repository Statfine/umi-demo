import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

class SetPage extends React.Component {
  state = {}

  handleAddCount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setModels/effectsAdd',
    });
  }

  handleremoveCount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setModels/effectsRemove',
    });
  }

  handleResetCount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'setModels/changeCount',
      payload: 0,
    });
  }

  render() {
    const { setModels, loading } = this.props;
    return (
      <div>
        <p>loading:{loading ? '操作中' : '操作完成'}</p>
        <p>acount:{setModels.count}</p>
        <Button type="primary" disabled={loading} onClick={this.handleAddCount}>添加</Button>
        <Button type="primary" disabled={loading} onClick={this.handleremoveCount}>递减</Button>
        <Button type="primary" disabled={loading} onClick={this.handleResetCount}>重置</Button>
      </div>
    );
  }
}

export default connect(({ setModels, loading }) => ({
  setModels,
  // loading: loading.effects['setModels/effectsAdd'] || loading.effects['setModels/effectsRemove'],
  loading: loading.effects['setModels/effectsAdd'],
}))(SetPage);
