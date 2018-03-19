import { createStore, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from "../reducers/reducers";
import { initialState } from "../state/initialState";

const devToolsExtension: GenericStoreEnhancer = (window as any)['devToolsExtension'] ?
    (window as any)['devToolsExtension']() : f => f;

const store = createStore(reducer, initialState, compose(devToolsExtension) as GenericStoreEnhancer)

export = store;