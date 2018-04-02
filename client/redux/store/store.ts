import * as Redux from 'redux';
import { reducer } from "../reducers/reducers";
import { initialState } from "../state/initialState";
import { State } from '../types/types';
import * as Thunk from 'redux-thunk';

const devToolsExtension: Redux.GenericStoreEnhancer = (window as any)['devToolsExtension'] ?
    (window as any)['devToolsExtension']() : f => f;

const store: Redux.Store<State> = Redux.createStore(reducer, initialState, Redux.compose(Redux.applyMiddleware(Thunk.default), devToolsExtension as Redux.GenericStoreEnhancer))

export = store;