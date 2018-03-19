import * as React from 'react';
import classes from '../scss/containers/App/App.scss';
import { NavLayout } from './Nav/NavLayout';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { State, User } from '../redux/state/initialState';
import { loadUser } from '../redux/actions/actions';

interface AppProps {
    project: string
}
class App extends React.Component<AppProps, Object> {
    render() {
        return (
            <div className={classes.App}>
                <NavLayout />
                <h1>Welcome to {this.props.project}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: State): State => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Function, user: User) => {
    return {
        loadUser: dispatch(loadUser(user))
    }
}

export { App }

// TODO: see how to use react-redux with typescript
// type checking for App fails
//const mappedApp = connect(mapStateToProps, mapDispatchToProps)(App)