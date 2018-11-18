import * as React from 'react';
import * as Redux from 'redux';
import { Param1, Overwrite, Omit } from 'type-zoo';

// conditional types from https://www.typescriptlang.org/docs/handbook/advanced-types.html#example-1
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]; // tslint:disable-line:ban-types
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]; // tslint:disable-line:ban-types
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type IsMoreThanOneParam<Func> = Func extends (a: any, b: undefined, ...args: Array<any>) => any ? Func : never;
type FunctionWithoutFirstParam<F> = IsMoreThanOneParam<F> extends () => void
  ? (payload: Param1<F>) => void
  : () => void;
type FunctionsWithoutFirstParam<T> = { [k in keyof T]: FunctionWithoutFirstParam<T[k]> };

type EnhancerFunction = (...funcs: Array<Redux.StoreEnhancer>) => Redux.StoreEnhancer;

type ModelReducers<Model> = { [key in keyof Model]?: any };

declare module 'easy-peasy' {
  type ModelActions<Model, Reducers extends ModelReducers<Model> = {}> = {
    [k in keyof Model]: Omit<FunctionsWithoutFirstParam<FunctionProperties<Model[k]>>, keyof Reducers[k]>
  };
  type ModelValues<Model, Reducers extends ModelReducers<Model> = {}> = {
    [k in keyof Model]: NonFunctionProperties<Model[k]>
  } &
    Reducers;

  interface Config<Model> {
    devTools?: boolean;
    initialState?: ModelValues<Model>;
    injections?: any;
    middleware?: Array<Redux.Middleware>;
    compose?: typeof Redux.compose | Redux.StoreEnhancer | EnhancerFunction;
  }

  type Dispatch<Model = any, Reducers extends ModelReducers<Model> = {}> = Redux.Dispatch &
    ModelActions<Model, Reducers>;

  type Store<Model = any, Reducers extends ModelReducers<Model> = {}> = Overwrite<
    Redux.Store,
    { dispatch: Dispatch<Model, Reducers>; getState: () => ModelValues<Model, Reducers> }
  >;

  function createStore<Model = any, Reducers extends ModelReducers<Model> = {}>(
    model: Model,
    config: Config<Model>,
  ): Store<Model, Reducers>;

  type Effect<Payload = undefined> = Payload extends undefined ? (a: any) => void : (a: any, b: Payload) => void;

  function effect<Model = any, Reducers extends ModelReducers<Model> = {}, Payload = never>(
    effectAction: (
      dispatch: Dispatch<Model, Reducers>,
      payload: Payload,
      getState: () => ModelValues<Model, Reducers>,
    ) => void,
  ): Effect<Payload>;

  type Reducer<State> = (state: State, action: Redux.Action) => State;
  function reducer<State>(reducerFunction: Reducer<State>): Reducer<State>;

  type Select<State = any, T = any> = (state: State) => T;
  /*
  type Selector<State = any, T = any> = T & {
    __select__: true;
    __selectDependencies__?: Array<Selector>;
    __selectState__: { parentPath: string; key: string; executed: boolean };
  };
  */
  type Selector<State = any, T = any> = never;
  export function select<State, T>(
    selectFunction: Select<State, T>,
    dependencies?: Array<Selector>,
  ): Selector<State, T>;

  export class StoreProvider<Model = any, Reducers extends ModelReducers<Model> = {}> extends React.Component<{
    store: Store<Model, Reducers>;
  }> {}

  export function useStore<T = any, Model = any, Reducers extends ModelReducers<Model> = {}>(
    mapState: (state: ModelValues<Model, Reducers>) => T,
  ): T;

  export function useAction<T = any, Model = any, Reducers extends ModelReducers<Model> = {}>(
    mapAction: (actions: ModelActions<Model, Reducers>) => (payload: T) => void,
  ): (payload: T) => void;
}
