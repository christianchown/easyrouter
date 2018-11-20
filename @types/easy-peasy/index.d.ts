import * as React from 'react';
import * as Redux from 'redux';
import { Param1, Overwrite, Omit } from 'type-zoo';

/**
 * Helper types
 */

// conditional types from https://www.typescriptlang.org/docs/handbook/advanced-types.html#example-1
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// helpers to extract actions and values from easy-peasy models
type IsMoreThanOneParam<Func> = Func extends (a: any, b: undefined, ...args: Array<any>) => any ? Func : never;
type FunctionWithoutFirstParam<F> = IsMoreThanOneParam<F> extends () => void
  ? (payload: Param1<F>) => void
  : () => void;
type FunctionsWithoutFirstParam<T> = { [k in keyof T]: FunctionWithoutFirstParam<T[k]> };
type ActionFunction<Payload = undefined> = Payload extends undefined ? () => void : (payload: Payload) => void;

// given a model, get the state shapes of any reducer(...)s
type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type ReducerStateShapes<Model> = {
  [K in keyof FunctionProperties<Model>]: FunctionReturnType<FunctionProperties<Model>[K]>
};

// given a model, get the value types of any select(...)s
type SelectPropertyNames<T> = { [K in keyof T]: T[K] extends Select<any, any> ? K : never }[keyof T];
type SelectProperties<T> = Pick<T, SelectPropertyNames<T>>;
type SelectPropertyTypes<T> = {
  [K in keyof SelectProperties<T>]: SelectProperties<T>[K] extends Select<any, infer R> ? R : never
};
type SelectValueTypes<Model> = { [K in keyof Model]: SelectPropertyTypes<Model[K]> };

// given a model, get the value types of any reducer(...)s and select(...)s
type ReducerValues<Model> = ReducerStateShapes<Model> & SelectValueTypes<Model>;

// given an easy-peasy Model, extract just the actions
export type ModelActions<Model> = {
  [k in keyof Model]: Omit<FunctionsWithoutFirstParam<FunctionProperties<Model[k]>>, keyof ReducerValues<Model>[k]>
};

// given an easy-peasy Model, extract just the state values, minus reducers and select(...)s
export type ModelValuesWithoutReducers<Model> = {
  [k in keyof Model]: Omit<NonFunctionProperties<Model[k]>, keyof ReducerValues<Model>[k]>
};

// given an easy-peasy Model, extract just the state values
export type ModelValues<Model> = ModelValuesWithoutReducers<Model> & ReducerValues<Model>;

// easy-peasy's decorated Redux dispatch() (e.g. dispatch.todos.insert(item); )
export type Dispatch<Model = any> = Redux.Dispatch & ModelActions<Model>;

/**
 * https://github.com/ctrlplusb/easy-peasy#createstoremodel-config
 */

type EnhancerFunction = (...funcs: Array<Redux.StoreEnhancer>) => Redux.StoreEnhancer;

export interface Config<Model> {
  devTools?: boolean;
  initialState?: ModelValuesWithoutReducers<Model>;
  injections?: any;
  middleware?: Array<Redux.Middleware>;
  compose?: typeof Redux.compose | Redux.StoreEnhancer | EnhancerFunction;
}

export type Store<Model = any> = Overwrite<
  Redux.Store,
  { dispatch: Dispatch<Model>; getState: () => Readonly<ModelValues<Model>> }
>;

export function createStore<Model = any>(model: Model, config?: Config<Model>): Store<Model>;

/**
 * https://github.com/ctrlplusb/easy-peasy#action
 */

export type Action<StateValues, Payload = undefined> = Payload extends undefined
  ? (state: StateValues) => void | StateValues
  : (state: StateValues, payload: Payload) => void | StateValues;

/**
 * https://github.com/ctrlplusb/easy-peasy#effectaction
 */

export type Effect<Model, Payload = undefined> = Payload extends undefined
  ? (
      effectAction: (dispatch: Dispatch<Model>, payload: never, getState: () => Readonly<ModelValues<Model>>) => void,
    ) => never
  : (
      effectAction: (dispatch: Dispatch<Model>, payload: Payload, getState: () => Readonly<ModelValues<Model>>) => void,
      b: Payload,
    ) => never;

export function effect<Model = any, Payload = never>(
  effectAction: (dispatch: Dispatch<Model>, payload: Payload, getState: () => Readonly<ModelValues<Model>>) => void,
): Effect<Model, Payload>;

/**
 * https://github.com/ctrlplusb/easy-peasy#reducerfn
 */

export type Reducer<State> = (state: State, action: Redux.Action) => State;

export function reducer<State>(reducerFunction: Reducer<State>): Reducer<State>;

/**
 * https://github.com/ctrlplusb/easy-peasy#selectselector
 */

export type Select<StateValues, ResultantType> = (
  selectFunction: (state: StateValues) => ResultantType,
  dependencies?: Array<(state: any) => any>,
) => never;

export function select<StateValues = any, ResultantType = any>(
  selectFunction: (state: StateValues) => ResultantType,
  dependencies?: Array<(state: any) => any>,
): Select<StateValues, ResultantType>;

/**
 * https://github.com/ctrlplusb/easy-peasy#storeprovider
 */

export class StoreProvider<Model = any> extends React.Component<{ store: Store<Model> }> {}

/**
 * https://github.com/ctrlplusb/easy-peasy#usestoremapstate-externals
 */

export function useStore<Model = any, StateValue = any>(
  mapState: (state: ModelValues<Model>) => StateValue,
  externals?: Array<any>,
): StateValue;

/**
 * https://github.com/ctrlplusb/easy-peasy#useactionmapaction
 */

export function useAction<Model = any, ActionFunctionPayload = undefined>(
  mapAction: (dispatch: ModelActions<Model>) => ActionFunction<ActionFunctionPayload>,
): ActionFunction<ActionFunctionPayload>;
