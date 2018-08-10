import {compose} from 'redux';
import {Cmd, loop} from 'redux-loop';

const initialState = {
  login: false,
  retrieved: false,
  retrieveAmount: 0,
};

export {initialState};

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)) }

const retrieve = async (num) => {
  await sleep(100);
  return Promise.resolve(num + 1);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return loop(
        {
          ...state,
          login: true,
        },
        Cmd.run(() => {}, {
          successActionCreator: () => ({type: 'AUTH_START_RETRIEVE'}),
        }),
      );

    case 'AUTH_LOGOUT':
      return {
        ...initialState,
      };

    case 'AUTH_START_RETRIEVE':
      return loop(
        state,
        Cmd.run(() => {}, {
          successActionCreator: () => ({type: 'AUTH_INC_RETRIEVE'}),
        }),
      );

    case 'AUTH_INC_RETRIEVE': {
      if (!state.login) {
        return state;
      }
      const retrieveAmount = state.retrieveAmount + 1;
      return loop(
        {
          ...state,
          retrieveAmount,
        },
        Cmd.run(retrieve, {
          args: [retrieveAmount],
          successActionCreator: (num) => {
            if (num > 100) {
              return {type: 'AUTH_END_RETRIEVE'};
            }
            return {type: 'AUTH_INC_RETRIEVE'};
          },
        }),
      );
    }

    case 'AUTH_END_RETRIEVE':
      return {
        ...state,
        retrieveAmount: 100,
        retrieved: true,
      };

    default:
      return state;
  }
};

export default reducer;
