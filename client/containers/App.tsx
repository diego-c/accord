import * as React from 'react';
import classes from '../scss/containers/App/App.scss';
import { NavLayout } from './Nav/NavLayout';
import { connect } from 'react-redux';
import { State, User } from '../redux/state/initialState';
import { loadUser } from '../redux/actions/actions';
import { UserAction } from '../redux/actions/userActions';
import { MainLayout } from '../components/MainLayout/MainLayout';

interface AppProps {
    project: string,
    loadUser: (user: User) => UserAction,
    user: User
}

class App extends React.Component<AppProps, State> {

    render() {
        return (
            <div className={classes.App}>
                <NavLayout />
                <MainLayout />
            </div>
        )
    }
}

const mapStateToProps = (state: State): State => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    loadUser: (user: User) => dispatch(loadUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// TODO: see how to use react-redux with typescript
// type checking for App fails
// see https://github.com/piotrwitek/react-redux-typescript-guide