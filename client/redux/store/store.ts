import * as Redux from 'redux';
import { reducer } from "../reducers/reducers";
import { initialState, State } from "../state/initialState";
// import * as ReactRedux from 'react-redux';

const devToolsExtension: Redux.GenericStoreEnhancer = (window as any)['devToolsExtension'] ?
    (window as any)['devToolsExtension']() : f => f;

const store: Redux.Store<State> = Redux.createStore(reducer, initialState, Redux.compose(devToolsExtension) as Redux.GenericStoreEnhancer)

export = store;