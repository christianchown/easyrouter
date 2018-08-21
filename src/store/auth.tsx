import {OtherAction} from './reducer';
import {Cmd, loop} from 'redux-loop';

export interface LoginAction {
  type: 'AUTH_LOGIN';
}

export interface LogoutAction {
  type: 'AUTH_LOGOUT';
}

export interface StartRetrieveAction {
  type: 'AUTH_START_RETRIEVE';
}

export interface IncRetrieveAction {
  type: 'AUTH_INC_RETRIEVE';
}

export interface EndRetrieveAction {
  type: 'AUTH_END_RETRIEVE';
}

export interface Auth {
  login: boolean;
  retrieved: boolean;
  retrieveAmount: number;
}

const initialState: Auth = {
  login: false,
  retrieved: false,
  retrieveAmount: 0,
};

export {initialState};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const retrieve = async (num: number) => {
  await sleep(10);
  return Promise.resolve(num + 1);
};

type AuthAction = LoginAction | LogoutAction | StartRetrieveAction | IncRetrieveAction | EndRetrieveAction;

const reducer = (state: Auth = initialState, action: AuthAction | OtherAction) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return loop(
        {
          ...state,
          login: true,
        },
        Cmd.run(
          () => {
            // empty
          },
          {
            successActionCreator: () => ({type: 'AUTH_START_RETRIEVE'}),
          },
        ),
      );

    case 'AUTH_LOGOUT':
      return {
        ...initialState,
      };

    case 'AUTH_START_RETRIEVE':
      return loop(
        state,
        Cmd.run(
          () => {
            // empty
          },
          {
            successActionCreator: () => ({type: 'AUTH_INC_RETRIEVE'}),
          },
        ),
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
            if (num > 100 || state.retrieved) {
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
