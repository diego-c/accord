import * as React from 'react';
import Navbar from '../../containers/Nav/Navbar';
import { connect, Dispatch } from 'react-redux';
import { State, UserInfo, User } from '../../redux/types/types';
import { Route, Switch, } from 'react-router';
import { fetchUser } from '../../redux/actions/actions';
import { Home } from '../../components/Home/Home';
import { SignUp } from '../../containers/Auth/SignUp';
import SignIn from '../../containers/Auth/SignIn';
import { About } from '../../components/About/About';
import Protected from '../../components/Protected/Protected';
import { Notification } from '../../components/Notification/Notification';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import { AxiosError } from 'axios';
import SignOut from '../../components/SignOut/SignOut';

interface MainLayoutProps {
    user: User | null,
    error: AxiosError | null,
    fetchUser: (userInfo: UserInfo) => any
}

interface MainLayoutState {
    error: boolean
}

class MainLayout extends React.PureComponent<MainLayoutProps, MainLayoutState> {

    constructor(props: MainLayoutProps) {
        super(props);
        this.state = {
            error: false
        }
        this.fetchUser();
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.setState({
                error: true
            })
        }
    }

    fetchUser = () => {
        const token = localStorage.getItem('token');
        const publicKey = localStorage.getItem('public_key');

        this.props.fetchUser({ token, publicKey });
    }

    handleNotification = (_: React.SyntheticEvent<any>, __: string) => {
        this.setState({ error: false })
    }

    render() {
        return (
            <React.Fragment>
                <Notification
                    open={this.state.error}
                    vertical="top"
                    horizontal="center"
                    message="Please sign in to continue"
                    close={this.handleNotification}
                />

                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/about" exact component={About} />
                    <Route path="/signout" exact component={SignOut} />

                    <ProtectedRoute
                        routeProps={{
                            exact: true,
                            path: '/protected'
                        }}
                        Component={Protected}
                        isAuth={Boolean(this.props.user && !this.state.error)} />
                </Switch>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    fetchUser: (userInfo: UserInfo) => dispatch(fetchUser(userInfo))
});

const mapStateToProps = (state: State) => ({
    user: state.user,
    error: state.error
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);