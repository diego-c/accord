import * as React from 'react';
import Navbar from '../../containers/Nav/Navbar';
import { connect, Dispatch } from 'react-redux';
import { State, UserInfo, UserAction, User, Room } from '../../redux/types/types';
import { fetch } from '../../axios/connect';
import { Route } from 'react-router';
import { loadCredentials, updateRoute } from '../../redux/actions/actions';
import { Home } from '../Home/Home';
import { SignUp } from '../../containers/Auth/SignUp';
import { SignIn } from '../../containers/Auth/SignIn';
import { About } from '../About/About';
import { Protected } from '../Protected/Protected';

interface MainLayoutProps {
    currentRoute: string | null,
    test: Object | null,
    user: User | null,
    rooms: Room[] | null,
    userInfo: UserInfo | null,
    error: Object | null,
    loadCredentials: (cred: UserInfo) => UserAction,
    updateRoute: (route: string) => any
}

class MainLayout extends React.Component<MainLayoutProps, {}> {

    componentDidMount() {
        const publicKey = localStorage.getItem('public_key');
        const token = localStorage.getItem('token');

        if (token && publicKey) {
            (this.props as any).loadCredentials({ token, publicKey })
            fetch
                .post('/', { token, publicKey })
                .then(res => console.log(JSON.stringify(res.data, null, 2)))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar isAuthenticated={false} />
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/about" exact component={About} />
                <Route path="/protected" exact component={Protected} />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    updateRoute: (route: string) => dispatch(updateRoute(route)),
    loadCredentials: (cred: UserInfo) => dispatch(loadCredentials(cred))
});

const mapStateToProps = (state: State) => ({
    currentRoute: state.currentRoute,
    user: state.user,
    rooms: state.rooms,
    userInfo: state.userInfo,
    error: state.error,
    test: state.test
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);