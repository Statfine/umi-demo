import { routerRedux } from 'dva/router';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  namespace: 'setModels',

  state: {
    count: 0,
  },

  effects: {
    *effectsAdd({ payload }, { call, put, select }) {
      try {
        yield call(delay, 1000);
        const count = yield select(state => state.setModels.count);
        yield put({
          type: 'setModels/changeCount',
          payload: count + 1,
        });
      } catch (e) {
        console.log(e);
      }
    },
    effectsRemove: [
      function* fn({ payload }, { call, put, select }) {
        yield call(delay, 1000);
        const count = yield select(state => state.setModels.count);
        yield put({
          type: 'setModels/changeCount',
          payload: count - 1,
        });
      },
      { type: 'takeLatest' },
    ],
  },

  reducers: {
    changeCount(state, action) {
      return {
        ...state,
        count: action.payload,
      };
    },
  },
};
