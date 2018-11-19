import * as React from 'react';
import * as Redux from 'redux';
import { Param1, Overwrite, Omit } from 'type-zoo';

// conditional types from https://www.typescriptlang.org/docs/handbook/advanced-types.html#example-1
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]; // tslint:disable-line:ban-types
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]; // tslint:disable-line:ban-types
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// helpers to extract actions and values from easy-peasy models
type IsMoreThanOneParam<Func> = Func extends (a: any, b: undefined, ...args: Array<any>) => any ? Func : never;
type FunctionWithoutFirstParam<F> = IsMoreThanOneParam<F> extends () => void
  ? (payload: Param1<F>) => void
  : () => void;
type FunctionsWithoutFirstParam<T> = { [k in keyof T]: FunctionWithoutFirstParam<T[k]> };

// easy-peasy ModelReducerValues: object mapping functions in the model that get reduced to values
// e.g. those from select(...) and the state shape of reducer(...)
type ReducerValues<Model> = { [key in keyof Model]?: any };

// for compose in Config
type EnhancerFunction = (...funcs: Array<Redux.StoreEnhancer>) => Redux.StoreEnhancer;

declare module 'easy-peasy' {
  // given an easy-peasy Model and its ModelReducerValues, extract just the actions
  type ModelActions<Model, ModelReducerValues extends ReducerValues<Model> = {}> = {
    [k in keyof Model]: Omit<FunctionsWithoutFirstParam<FunctionProperties<Model[k]>>, keyof ModelReducerValues[k]>
  };

  // given an easy-peasy Model and its ModelReducerValues, extract just the state values
  type ModelValues<Model, ModelReducerValues extends ReducerValues<Model> = {}> = {
    [k in keyof Model]: NonFunctionProperties<Model[k]>
  } &
    ModelReducerValues;

  interface Config<Model, ModelReducerValues extends ReducerValues<Model> = {}> {
    devTools?: boolean;
    initialState?: ModelValues<Model, ModelReducerValues>;
    injections?: any;
    middleware?: Array<Redux.Middleware>;
    compose?: typeof Redux.compose | Redux.StoreEnhancer | EnhancerFunction;
  }

  // easy-peasy's decorated Redux dispatch() (e.g. dispatch.todos.insert(item); )
  type Dispatch<Model = any, ModelReducerValues extends ReducerValues<Model> = {}> = Redux.Dispatch &
    ModelActions<Model, ModelReducerValues>;

  type Store<Model = any, ModelReducerValues extends ReducerValues<Model> = {}> = Overwrite<
    Redux.Store,
    { dispatch: Dispatch<Model, ModelReducerValues>; getState: () => ModelValues<Model, ModelReducerValues> }
  >;

  function createStore<Model = any, ModelReducerValues extends ReducerValues<Model> = {}>(
    model: Model,
    config: Config<Model, ModelReducerValues>,
  ): Store<Model, ModelReducerValues>;

  type Effect<Payload = undefined> = Payload extends undefined ? (a: any) => void : (a: any, b: Payload) => void;

  function effect<Model = any, ModelReducerValues extends ReducerValues<Model> = {}, Payload = never>(
    effectAction: (
      dispatch: Dispatch<Model, ModelReducerValues>,
      payload: Payload,
      getState: () => ModelValues<Model, ModelReducerValues>,
    ) => void,
  ): Effect<Payload>;

  type Reducer<State> = (state: State, action: Redux.Action) => State;
  function reducer<State>(reducerFunction: Reducer<State>): Reducer<State>;

  type Select<State = any, T = any> = (state: State) => T;

  type Selector<State = any, T = any> = never;
  export function select<State, T>(
    selectFunction: Select<State, T>,
    dependencies?: Array<Selector>,
  ): Selector<State, T>;

  export class StoreProvider<Model = any, ModelReducerValues extends ReducerValues<Model> = {}> extends React.Component<{
    store: Store<Model, ModelReducerValues>;
  }> {}

  export function useStore<StoreValue = any, Model = any, ModelReducerValues extends ReducerValues<Model> = {}>(
    mapState: (state: ModelValues<Model, ModelReducerValues>) => StoreValue,
    externals?: Array<any>,
  ): StoreValue;

  export function useAction<
    ActionFunction extends Function = () => void,
    Model = any,
    ModelReducerValues extends ReducerValues<Model> = {}
  >(mapAction: (dispatch: ModelActions<Model, ModelReducerValues>) => ActionFunction): ActionFunction;
}
