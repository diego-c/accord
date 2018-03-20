import { createStore, compose, GenericStoreEnhancer } from 'redux';
import { reducer } from "../reducers/reducers";
import { initialState, State } from "../state/initialState";
import { Store } from 'react-redux';

const devToolsExtension: GenericStoreEnhancer = (window as any)['devToolsExtension'] ?
    (window as any)['devToolsExtension']() : f => f;

const store: Store<State> = createStore(reducer, initialState, compose(devToolsExtension) as GenericStoreEnhancer)

export = store;