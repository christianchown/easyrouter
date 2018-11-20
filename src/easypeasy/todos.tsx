import todoService from 'todoService';
import { effect, Effect, Action, createStore, Select, select } from 'easy-peasy';

interface TodoValues {
  items: Array<string>;
}

interface TodoActions {
  saveTodo: Effect<StoreState, string>;
  todoSaved: Action<TodoValues, string>;
  lengthOfItems: Select<TodoValues, number>;
}

interface StoreState {
  todos: TodoValues & TodoActions;
}

const store = createStore<StoreState>({
  todos: {
    items: [],

    saveTodo: effect(async (dispatch, payload, getState) => {
      const saved = await todoService.save(payload);
      dispatch.todos.todoSaved(saved);          //  👍 correctly typed
      // dispatch.todos.todoSaved(1);               👍 correctly errors! (1 is not assignable to string)
      // dispatch.notToDos.something();             👍 correctly errors! (notToDos does not exist on Dispatch<StoreState>)
      if (getState().todos.lengthOfItems > 10) { // 👍 correctly typed
        todoService.reportBigUsage();
      }
    }),

    todoSaved: (state, payload) => {
      state.items.push(payload); //        👍 correctly typed
      // state.items.push(1);              👍 correctly errors! (1 is not assignable to string)
      //if (state.lengthOfItems > 10) { // ❌ lengthOfItems does not exist on TodoValues, as it's a select(...)ed value
      //}
    },

    lengthOfItems: select((state) => {
      return state.items.length; // 👍 correctly typed
    }),
  }
});

//type SelectPropertyNames<T> = { [K in keyof T]: T[K] extends { __select__: infer R } ? K : never }[keyof T];
type SelectPropertyNames<T> = { [K in keyof T]: T[K] extends Select<any, any> ? K : never }[keyof T];
type SelectProperties<T> = Pick<T, SelectPropertyNames<T>>;
type SelectPropertyTypes<T> = {
  [K in keyof SelectProperties<T>]: SelectProperties<T>[K] extends { __select__: infer R } ? R : never
};
type SelectValueTypes<Model> = { [K in keyof Model]: SelectPropertyTypes<Model[K]> };

type SVTs = SelectValueTypes<StoreState>;
type SPNs = SelectPropertyNames<TodoActions>;

function f(s: SVTs, p: SPNs) {

}