import * as React from 'react';
import { Navbar } from '../../containers/Nav/Navbar';
import { Route } from 'react-router-dom';
import { Protected } from '../Protected/Protected';
import { connect, Dispatch } from 'react-redux';
import { UserInfo, State } from '../../redux/types/types';
import { loadCredentials } from '../../redux/actions/actions';
import { UserAction } from '../../redux/types/types';

interface MainLayoutProps extends State {
    loadCredentials: (cred: UserInfo) => UserAction
}

class MainLayout extends React.Component<MainLayoutProps, {}> {

    componentDidMount() {
        const publicKey = localStorage.getItem('public_key');
        const token = localStorage.getItem('token');

        if (token && publicKey) {
            this.props.loadCredentials({ token, publicKey });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar isAuthenticated={false} />
                <Route path="/protected" exact component={Protected} />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    loadCredentials: (cred: UserInfo) => dispatch(loadCredentials(cred))
});

const mapStateToProps = (state: State) => ({
    user: state.user,
    rooms: state.rooms,
    userInfo: state.userInfo,
    error: state.error,
    test: state.test
});

const ConnectedMainLayout = connect(mapStateToProps, mapDispatchToProps)(MainLayout);

export { ConnectedMainLayout };