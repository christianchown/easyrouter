import * as React from 'react';
import * as Redux from 'redux';

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

declare module 'easy-peasy' {
  // conditional types from https://www.typescriptlang.org/docs/handbook/advanced-types.html#example-1

  export type Value = string | number | boolean | object | null | undefined;

  type AnyValueShape = {
    [index: string]: Value;
  };

  export type ValueHook = Value | { [index: string]: Value };

  export type Function<V extends {} = AnyValueShape> = (state: V, payload?: any) => void;

  export type DispatchAction = (payload?: any) => void;

  export type ActionHook = DispatchAction | { [index: string]: DispatchAction };

  export type DispatchFunctions<V, T extends keyof V> = FunctionProperties<V[T]>;

  export type DispatchesFrom<Model> = { [index in keyof Model]: DispatchFunctions<Model, index> };

  export type Dispatch<Model> = Redux.Dispatch<Redux.Action> & DispatchesFrom<Model>;

  export type EffectAction<Model = any> = (
    dispatch: Dispatch<Model>,
    payload: any,
    getState: () => Model,
    injections: any,
  ) => void;

  export type Effect<Model = any> = (action: EffectAction<Model>) => Function<NonFunctionProperties<Model>>;

  export type Selector<Model> = (state: Model, dependencies?: Array<string>) => Value;

  export type Select<Model = any> = (selector: Selector<Model>) => Value;

  export type Action = Function | Effect | Select;

  type AnyActionShape = {
    [index: string]: Action;
  };

  export type Values<V extends {} = AnyValueShape> = { [valueKey in keyof V]: Value };

  export type Actions<V extends {} = AnyValueShape, A extends {} = AnyActionShape> = {
    [actionKey in keyof A]: Function<V> | Effect | Select
  };

  export interface Config {
    devTools?: boolean;
    initialState?: object;
    injections?: any;
    middleware?: Array<Redux.Middleware>;
    compose?: typeof Redux.compose | Redux.StoreEnhancer<any, any>;
  }

  export const createStore: <Model>(model: Model, config: Config) => Redux.Store;

  export function effect<Model>(action: EffectAction<Model>): Function<NonFunctionProperties<Model>>;

  export function select<Model>(state: Model, dependencies?: Array<string>): Value;

  export class StoreProvider extends React.Component<{ store: Redux.Store }> {}

  export const useStore: <Model>(mapState: (state: Model) => Value) => ValueHook;

  export const useAction: <Actions extends {} = AnyActionShape>(dispatch: Dispatch<Actions>) => ActionHook;
}
